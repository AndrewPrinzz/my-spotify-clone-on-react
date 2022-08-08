import { css, injectGlobal } from '@emotion/css'
import * as colors from 'styles/colors'

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: 'Montserrat';
    letter-spacing: 0.02em;
    color: ${colors.base}
  }

  @font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Light.eot');
	src: local('assets/fonts/Montserrat Light'), local('assets/fonts/Montserrat-Light'),
		url('assets/fonts/Montserrat-Light.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Light.woff') format('woff'),
		url('assets/fonts/Montserrat-Light.ttf') format('truetype');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-MediumItalic.eot');
	src: local('assets/fonts/Montserrat Medium Italic'), local('assets/fonts/Montserrat-MediumItalic'),
		url('assets/fonts/Montserrat-MediumItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-MediumItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-MediumItalic.ttf') format('truetype');
	font-weight: 500;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Thin.eot');
	src: local('assets/fonts/Montserrat Thin'), local('assets/fonts/Montserrat-Thin'),
		url('assets/fonts/Montserrat-Thin.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Thin.woff') format('woff'),
		url('assets/fonts/Montserrat-Thin.ttf') format('truetype');
	font-weight: 100;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-ExtraLightItalic.eot');
	src: local('assets/fonts/Montserrat ExtraLight Italic'), local('assets/fonts/Montserrat-ExtraLightItalic'),
		url('assets/fonts/Montserrat-ExtraLightItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-ExtraLightItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-ExtraLightItalic.ttf') format('truetype');
	font-weight: 200;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-BoldItalic.eot');
	src: local('assets/fonts/Montserrat Bold Italic'), local('assets/fonts/Montserrat-BoldItalic'),
		url('assets/fonts/Montserrat-BoldItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-BoldItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-BoldItalic.ttf') format('truetype');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-SemiBold.eot');
	src: local('assets/fonts/Montserrat SemiBold'), local('assets/fonts/Montserrat-SemiBold'),
		url('assets/fonts/Montserrat-SemiBold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-SemiBold.woff') format('woff'),
		url('assets/fonts/Montserrat-SemiBold.ttf') format('truetype');
	font-weight: 600;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-ExtraLight.eot');
	src: local('assets/fonts/Montserrat ExtraLight'), local('assets/fonts/Montserrat-ExtraLight'),
		url('assets/fonts/Montserrat-ExtraLight.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-ExtraLight.woff') format('woff'),
		url('assets/fonts/Montserrat-ExtraLight.ttf') format('truetype');
	font-weight: 200;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-ExtraBoldItalic.eot');
	src: local('assets/fonts/Montserrat ExtraBold Italic'), local('assets/fonts/Montserrat-ExtraBoldItalic'),
		url('assets/fonts/Montserrat-ExtraBoldItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-ExtraBoldItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-ExtraBoldItalic.ttf') format('truetype');
	font-weight: 800;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Italic.eot');
	src: local('assets/fonts/Montserrat Italic'), local('assets/fonts/Montserrat-Italic'),
		url('assets/fonts/Montserrat-Italic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Italic.woff') format('woff'),
		url('assets/fonts/Montserrat-Italic.ttf') format('truetype');
	font-weight: normal;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Bold.eot');
	src: local('assets/fonts/Montserrat Bold'), local('assets/fonts/Montserrat-Bold'),
		url('assets/fonts/Montserrat-Bold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Bold.woff') format('woff'),
		url('assets/fonts/Montserrat-Bold.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-LightItalic.eot');
	src: local('assets/fonts/Montserrat Light Italic'), local('assets/fonts/Montserrat-LightItalic'),
		url('assets/fonts/Montserrat-LightItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-LightItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-LightItalic.ttf') format('truetype');
	font-weight: 300;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-BlackItalic.eot');
	src: local('assets/fonts/Montserrat Black Italic'), local('assets/fonts/Montserrat-BlackItalic'),
		url('assets/fonts/Montserrat-BlackItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-BlackItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-BlackItalic.ttf') format('truetype');
	font-weight: 900;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-SemiBoldItalic.eot');
	src: local('assets/fonts/Montserrat SemiBold Italic'), local('assets/fonts/Montserrat-SemiBoldItalic'),
		url('assets/fonts/Montserrat-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-SemiBoldItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-SemiBoldItalic.ttf') format('truetype');
	font-weight: 600;
	font-style: italic;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Regular.eot');
	src: local('assets/fonts/Montserrat Regular'), local('assets/fonts/Montserrat-Regular'),
		url('assets/fonts/Montserrat-Regular.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Regular.woff') format('woff'),
		url('assets/fonts/Montserrat-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Medium.eot');
	src: local('assets/fonts/Montserrat Medium'), local('assets/fonts/Montserrat-Medium'),
		url('assets/fonts/Montserrat-Medium.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Medium.woff') format('woff'),
		url('assets/fonts/Montserrat-Medium.ttf') format('truetype');
	font-weight: 500;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-ExtraBold.eot');
	src: local('assets/fonts/Montserrat ExtraBold'), local('assets/fonts/Montserrat-ExtraBold'),
		url('assets/fonts/Montserrat-ExtraBold.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-ExtraBold.woff') format('woff'),
		url('assets/fonts/Montserrat-ExtraBold.ttf') format('truetype');
	font-weight: 800;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-Black.eot');
	src: local('assets/fonts/Montserrat Black'), local('assets/fonts/Montserrat-Black'),
		url('assets/fonts/Montserrat-Black.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-Black.woff') format('woff'),
		url('assets/fonts/Montserrat-Black.ttf') format('truetype');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'Montserrat';
	src: url('assets/fonts/Montserrat-ThinItalic.eot');
	src: local('assets/fonts/Montserrat Thin Italic'), local('assets/fonts/Montserrat-ThinItalic'),
		url('assets/fonts/Montserrat-ThinItalic.eot?#iefix') format('embedded-opentype'),
		url('assets/fonts/Montserrat-ThinItalic.woff') format('woff'),
		url('assets/fonts/Montserrat-ThinItalic.ttf') format('truetype');
	font-weight: 100;
	font-style: italic;
}

`