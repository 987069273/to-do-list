## 2020-05-24 新建

使用react和bootstrap创建了界面。记录一下主要遇到的问题和解决办法：bootstrap的dropdown组件，若下拉菜单不能正常弹出，可能需要安装popper.js和jquery依赖（问题一参考：https://stackoverflow.com/questions/46105807/bootstrap-popper-issue-while-using-webpack ，问题二报错信息：Cannot find file: 'node-jquery.js' does not match the corresponding name on disk: '本地路径\node_modules\jquery\lib\jQuery'，安装jquery依赖可行）


## 2020-05-28
react中报错 A component is changing an uncontrolled input of type undefined to be controlled. 
解决方法参考：https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
