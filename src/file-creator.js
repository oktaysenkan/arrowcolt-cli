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
    [`${fileName}.${fileExtension}x`]: `import React from 'react';
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
      <Text>{children}</Text>
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

const screen = (fileName, fileExtension) => {
  return {
    [`${fileName}.${fileExtension}x`]: `import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Style from './${fileName}.style';
import { Button } from '../../components';

const ${fileName} = () => {
  const navigation = useNavigation();

  return (
    <View style={Style.container}>
      <Text style={Style.defaultText}>By signing up I aggree with</Text>
    </View>
  );
};

export default ${fileName};
`,
    [`${fileName}.style.${fileExtension}`]: `import { StyleSheet } from 'react-native';
import Styles from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Styles.Spacing.containerPaddingHorizontal,
    paddingTop: Styles.Spacing.containerPaddingTop,
    paddingBottom: Styles.Spacing.containerPaddingBottom,
    backgroundColor: Styles.Colors.black,
    display: 'flex',
  },
  defaultText: {
    color: '#545454',
    fontSize: 13,
    fontFamily: Styles.Fonts.SourcecallBook,
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
    case fileTypes.SCREEN:
      return screen(fileName, fileExtension);
    case fileTypes.CONFIG:
      return null;
    case fileTypes.STYLE:
      return null;
    case fileTypes.UTIL:
      return null;
    default:
      throw new Error("Unknown file type.");
  }
};

module.exports = {
  createFiles: (fileType, fileName, fileExtension = "js", navigationName) => {
    const files = getFiles(fileType, fileName, fileExtension);
    const dependedNavigation = navigationName ? `${navigationName}/tabs/` : '';

    console.log();
    for (let [key, value] of Object.entries(files)) {
      fse
        .outputFile(
          `${process.cwd()}/src/${fileType.toLowerCase()}s/${dependedNavigation}${fileName}/${key}`,
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
