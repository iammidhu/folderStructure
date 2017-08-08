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
        key: "app"
    }, {
        key: "components",
        parent: "app"
    }, {
        key: "main",
        parent: "components"
    }, {
        key: "shared",
        parent: "components"
    }, {
        key: "home",
        parent: "main"
    },{
        key: "home.component.ts",
        parent: "home"
    }, {
        key: "login",
        parent: "main"
    },{
        key: "login.component.ts",
        parent: "login"
    }, {
        key: "Quiz",
        parent: "main"
    },  {
        key: "services",
        parent: "shared"
    }, {
        key: "api.service.ts",
        parent: "services"
    }, {
        key: "Questions",
        parent: "Quiz"
    },{
        key: "questions.component.ts",
        parent: "Questions"
    },  {
        key: "Result",
        parent: "Quiz"
    },{
        key: "result.component.ts",
        parent: "Result"
    },  {
        key: "assets",
        parent: "app"
    }, {
        key: "css",
        parent: "assets"
    }, {
        key: "style.css",
        parent: "css"
    },{
        key: "img",
        parent: "assets"
    },{
        key: "images.png",
        parent: "img"
    },{
        key: "data",
        parent: "assets"
    },{
        key: "Quiz.json",
        parent: "data"
    },];
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
