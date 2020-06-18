## 2020-05-24 新建

使用react和bootstrap创建了界面。记录一下主要遇到的问题和解决办法：bootstrap的dropdown组件，若下拉菜单不能正常弹出，可能需要安装popper.js和jquery依赖（问题一参考：https://stackoverflow.com/questions/46105807/bootstrap-popper-issue-while-using-webpack ，问题二报错信息：Cannot find file: 'node-jquery.js' does not match the corresponding name on disk: '本地路径\node_modules\jquery\lib\jQuery'，安装jquery依赖可行）


## 2020-05-28
基本完成交互。遇到的问题和解决办法：react中报错 A component is changing an uncontrolled input of type undefined to be controlled. 
解决方法参考：https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro

## 2020-05-30
完善交互，修改样式。遇到的问题和解决办法：package.json文件中，若要在windows环境中使用&&运算符连接两条指令，并用单引号（'）包裹时，可能会出现问题， 可行的解决方法有：使用转义的双引号（\\"）来替换单引号，如将'instruction_1 && instruction_2'改为\\"instruction_1 && instruction_2\\"，其中instruction_1和instruction_2分别为指令一和指令二。例子（改写后）：
```
"scripts": {
    "react-start": "react-scripts start",
    "start": "concurrently \"yarn react-start\" \"cd  todo_api && yarn start\""
}
```
