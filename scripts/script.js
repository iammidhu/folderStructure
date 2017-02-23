function init() {
    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; // for conciseness in defining templates
    myDiagram =
        $(go.Diagram, "zivebox", {
            allowMove: false,
            allowCopy: false,
            allowDelete: false,
            allowHorizontalScroll: false,
            layout: $(go.TreeLayout, {
                alignment: go.TreeLayout.AlignmentStart,
                angle: 0,
                compaction: go.TreeLayout.CompactionNone,
                layerSpacing: 16,
                layerSpacingParentOverlap: 1,
                nodeIndent: 2,
                nodeIndentPastParent: 0.88,
                nodeSpacing: 0,
                setsPortSpot: false,
                setsChildPortSpot: false
            })
        });
    myDiagram.nodeTemplate =
        $(go.Node, {
                selectionAdorned: false,
                // a custom function to allow expanding/collapsing on double-click
                // this uses similar logic to a TreeExpanderButton
                doubleClick: function(e, node) {
                    var cmd = myDiagram.commandHandler;
                    if (node.isTreeExpanded) {
                        if (!cmd.canCollapseTree(node)) return;
                    } else {
                        if (!cmd.canExpandTree(node)) return;
                    }
                    e.handled = true;
                    if (node.isTreeExpanded) {
                        cmd.collapseTree(node);
                    } else {
                        cmd.expandTree(node);
                    }
                }
            },
            $("TreeExpanderButton", {
                width: 14,
                "ButtonBorder.fill": "whitesmoke",
                "ButtonBorder.stroke": null,
                "_buttonFillOver": "rgba(0,128,255,0.25)",
                "_buttonStrokeOver": null
            }),
            $(go.Panel, "Horizontal", {
                    position: new go.Point(16, 0)
                },
                new go.Binding("background", "isSelected", function(s) {
                    return (s ? "#e3e4e5" : "white");
                }).ofObject(),
                $(go.Picture, {
                        width: 18,
                        height: 18,
                        margin: new go.Margin(0, 4, 0, 0),
                        imageStretch: go.GraphObject.Uniform
                    },
                    new go.Binding("source", "isTreeExpanded", imageConverter).ofObject(),
                    new go.Binding("source", "isTreeLeaf", imageConverter).ofObject()),
                $(go.TextBlock, {
                        font: '10pt Verdana, sans-serif'
                    },
                    new go.Binding("text", "key"))
            ) // end Horizontal Panel
        ); // end Node
    // without lines
    myDiagram.linkTemplate = $(go.Link);

    var nodeDataArray = [{
        key: "src"
    }, {
        key: "Content",
        parent: "src"
    }, {
        key: "css",
        parent: "Content"
    }, {
        key: "style.css",
        parent: "css"
    }, {
        key: "fonts ....",
        parent: "fonts"
    }, {
        key: "images here ....",
        parent: "images"
    }, {
        key: "js here ....",
        parent: "js"
    }, {
        key: "fonts",
        parent: "Content"
    }, {
        key: "images",
        parent: "Content"
    }, {
        key: "js",
        parent: "Content"
    }, {
        key: "Scripts",
        parent: "src"
    }, {
        key: "spa",
        parent: "Scripts"
    }, {
        key: "afterLogin",
        parent: "spa"
    }, {
        key: "components",
        parent: "afterLogin"
    }, {
        key: "approval",
        parent: "components"
    }, {
        key: "approvalApp.module.js",
        parent: "approval"
    }, {
        key: "chat",
        parent: "components"
    }, {
        key: "chatApp.module.js",
        parent: "chat"
    }, {
        key: "chatComponents",
        parent: "chat"
    }, {
        key: "feedback",
        parent: "components"
    }, {
        key: "afterLogin.html",
        parent: "afterLogin"
    }, {
        key: "afterLogin.module.js",
        parent: "afterLogin"
    }, {
        key: "beforeLogin",
        parent: "spa"
    }, {
        key: "auth",
        parent: "beforeLogin"
    }, {
        key: "authApp.module.js",
        parent: "auth"
    }, {
        key: ".........",
        parent: "auth"
    }, {
        key: "pricing",
        parent: "beforeLogin"
    }, {
        key: "pricing.module.js",
        parent: "pricing"
    }, {
        key: ".........",
        parent: "pricing"
    }, {
        key: "beforeLogin.module.js",
        parent: "beforeLogin"
    }, {
        key: "directives",
        parent: "spa"
    }, {
        key: "ngEnter.js",
        parent: "directives"
    }, {
        key: "starGroup.js",
        parent: "directives"
    }, {
        key: "main",
        parent: "spa"
    }, {
        key: "controllers",
        parent: "main"
    }, {
        key: "appCtrl.js",
        parent: "controllers"
    }, {
        key: "views",
        parent: "main"
    }, {
        key: "index.html",
        parent: "views"
    }, {
        key: "mainApp.js",
        parent: "main"
    }, {
        key: "services",
        parent: "spa"
    }, {
        key: "apiServices.js",
        parent: "services"
    }, {
        key: "chatService.js",
        parent: "services"
    }, {
        key: "app.js",
        parent: "spa"
    }, {
        key: "appRun.js",
        parent: "spa"
    }, {
        key: "appInterceptorFactory.js",
        parent: "spa"
    }, {
        key: "vendors",
        parent: "Scripts"
    }, {
        key: "common.js",
        parent: "vendors"
    }, {
        key: "screenleap.js",
        parent: "vendors"
    }];
    myDiagram.model = new go.TreeModel(nodeDataArray);
}


// takes a property change on either isTreeLeaf or isTreeExpanded and selects the correct image to use
function imageConverter(prop, picture) {
    var node = picture.part;
    if (node.isTreeLeaf) {
        return "images/document.png";
    } else {
        if (node.isTreeExpanded) {
            return "images/open.jpg";
        } else {
            return "images/folder_64.png";
        }
    }
}
