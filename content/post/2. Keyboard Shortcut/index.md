---
title: "Add Keyboard Shortcut R's Pipe Operator (%>%) to Jupyter Lab"
date: 2020-05-12
slug: "Jupyter Lab Custom Keyboard Shortcut"
image: the-creative-exchange-d2zvqp3fpro-unsplash.jpg
tags:
    - R
    - Jupyter Lab
    - Tips
categories:
    - Productivity
---

Recently, I have started using JupyterLab to write data science blog posts in both R & Python languages. I have found out that the keyboard shortcut in R Studio for pipe operator (%>%) `Ctrl` + `Shift` + `M` is not working in JupyterLab. Since I am used to %>% shortcut in RStudio, why not I add that into Jupyter Lab?

To do this, we would need to edit the settings for JupyterLab's keyboard shortcut plugin.

How can we do that?

First Step: Go to the *Setting > Advanced Settings Editor*.
![](/images/B3-1.png)

Next, click on *Keyboard Shortcuts*. You will see two pane side by side: *System Default* and *User Preference*. 
![](/images/B3-2.png)

Last step: Paste the following code into the **User Preference** Pane.
```
{
    "shortcuts": [
         {
            "command": "notebook:replace-selection",
            "selector": ".jp-Notebook",
            "keys": ["Ctrl Shift M"],
            "args": {"text": '%>% '}
        }
    ]
}
```
Now you are able to use the keyboard shortcut! 

#### Reference
1. [JupyterLab Github Issues][0]


[0]: https://github.com/jupyterlab/jupyterlab/pull/7908
