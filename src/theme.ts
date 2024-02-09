import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "light"
  };

const theme = extendTheme({
    config,
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'teal'
            }
        }
    }
})

export default theme