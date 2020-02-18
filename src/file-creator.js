const fse = require("fs-extra");
const colors = require("colors");

const fileTypes = {
  COMPONENT: "component",
  CONFIG: "config",
  SCREEN: "screen",
  STYLE: "style",
  UTIL: "util"
};

const component = (fileName, fileExtension) => {
  return {
    [`${fileName}.${fileExtension}`]: `import React from 'react';
import { View, Text } from 'react-native';
import Style from './${fileName}.style';

interface Props {
  style: React.CSSProperties;
  children: string;
}

const ${fileName}: React.FC<Props> = props => {
  const { children, style } = props;
  const combinedStyle = Object.assign({}, Style.default, style);
  return (
    <View {...props} style={combinedStyle}>
      <Text style={Style.text}>{children}</Text>
    </View>
  );
};
    
export default ${fileName};
    `,
    [`${fileName}.style.${fileExtension}`]: `import { StyleSheet } from 'react-native';
import Styles from '../../styles';
    
export default StyleSheet.create({
  default: {
    backgroundColor: Styles.Colors.white,
  },
});
    `,
    [`index.${fileExtension}`]: `import ${fileName} from './${fileName}';

export default ${fileName};
    `
  };
};

const getFiles = (fileType, fileName, fileExtension) => {
  switch (fileType.toLowerCase()) {
    case fileTypes.COMPONENT:
      return component(fileName, fileExtension);
    case fileTypes.CONFIG:
      return configBody;
    case fileTypes.SCREEN:
      return screenBody;
    case fileTypes.STYLE:
      return styleBody;
    case fileTypes.UTIL:
      return utilBody;
    default:
      throw new Error("Unknown file type.");
  }
};

module.exports = {
  createFiles: (fileType, fileName, fileExtension = "js") => {
    const files = getFiles(fileType, fileName, fileExtension);

    console.log();
    for (let [key, value] of Object.entries(files)) {
      fse
        .outputFile(
          `${process.cwd()}/src/${fileType.toLowerCase()}s/${key}`,
          value
        )
        .then(() => {
          console.log(`${key}`.green.bold + ` is created!`.green);
        })
        .catch(err => {
          console.error(`${err}`.red);
        });
    }
  }
};
