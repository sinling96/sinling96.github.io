---
title: "Must know shortcut keys in Jupyter Notebook"
date: 2020-06-28
slug: "shortcut keys in Jupyter Notebook"
categories:
    - Productivity
tags:
  - shortcut
---

As a developer, we should always follow the rule:
> If you start doing some action with the mouse, stop and think if there is a shortcut. If there is one - use it.

In this document, I will list down several shortcut that I find useful in navigating Jupyter Notebook.

Note: These shortcut can be applied to both Jupyter Notebook and Jupyter Lab, except for the customized shortcut, which is only available in Jupyter Lab as far as I understand.

## 1. Convert cell to md
As a data analysts, I used both code and markdown very frequently in my notebook. By default, all the cells in Jupyter notebook is code. To convert it to a markdown cell, we can use the UI (dropdown) to select markdown. 
<br></br>
Alternatively, use a shortcut:
<br></br>
Shortcut: `Esc + m`

## 2. Run target cell
Shortcut: `Ctrl + Enter`
Alternatively, you can click the Execute cell icon and select Run Cell. 

## 3. Run all code
Shortcut:  `Ctrl + Shift + Alt + Enter`

## 4. Run cell, move to next cell
Shortcut: `Shift + Enter`
This allows us the run several cells faster, and create a new cell if it has reached the end.

# More customized shortcut keys...
## 5. Run all below / Run all above
To do this, open your JupyterLab window.
Go to the Setting > Advanced Settings Editor.

Next, click on Keyboard Shortcuts. You will see two pane side by side: System Default and User Preference.

Finally, paste the following code into the User Preference Pane.

```json
{
       "shortcuts": [
        {
            "command": "notebook:run-all-below",
            "keys": [
                "Ctrl Shift ArrowDown"
            ],
            "selector": "[data-jp-code-runner]"
        },
        {
            "command": "notebook:run-all-above",
            "keys": [
                "Ctrl Shift ArrowUp"
            ],
            "selector": "[data-jp-code-runner]"
        }
    ]
}
```
## 6. Add cell below/ above
```json
{
    "shortcuts":[
        {
            ...
        },
        {
            "command": "notebook:insert-cell-below",
            "keys": [
                "Ctrl ArrowDown"
            ],
            "selector": ".jp-Notebook:focus"
        },
        {
            "command": "notebook:insert-cell-above",
            "keys": [
                "Ctrl ArrowUp"
            ],
            "selector": ".jp-Notebook:focus"
        }
    ]
}
        
```


To learn more about Jupyter shortcut, refer to this [article](http://maxmelnick.com/2016/04/19/python-beginner-tips-and-tricks.html)

To learn how to add keyboard shortcut for R pipe operator %>%, refer to my another [blog post](https://sinlingchan.com/posts/2-add-keyboard-shortcut-r-pipe-operator-to-jupyterlab/).