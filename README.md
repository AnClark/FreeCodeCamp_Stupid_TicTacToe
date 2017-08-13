# FreeCodeCamp Tic Tac Toe Homework

一个非常“蠢”的井字棋游戏，FreeCodeCamp 前端作业之一。

## 功能特性
#### “蠢”到极致
我还没有学习 AI 的编写，因此计算机落子采取**随机胡来**策略，所以玩家赢的可能性几乎为100%。

#### 可自选棋子
进入游戏时弹出棋子选择对话框，玩家可选择“X”或“O”作为自己的棋子。对话框基于 BootStrap 的模态框。

#### 可重置游戏
任何时候可点击顶栏的“Reset”重置游戏。重置时会给出提示。

#### 自建提示系统
Bootstrap 不支持 Toast。所以在这里用自建的函数 `_showAlert()` 操纵 Bootstrap 的警告框，实现类似于 Toast 的消息提示。
