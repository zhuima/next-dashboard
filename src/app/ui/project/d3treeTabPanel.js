import React, { useRef, useEffect, useState } from "react";
import Tree from 'react-d3-tree';
import { convertToD3Format } from "@/app/lib/utils"


const svgSquare = {
    shape: "node",
    shapeProps: {
        x: -10,
        y: -10,
        height: 30,
        width: 50
    }
};

const nodeSvgShape = {
    shape: 'circle',
    shapeProps: {
        r: 10,
        fill: 'green',
    },
};



typeof innerHeight !== 'undefined' ? window.innerHeight : 0
typeof innerWidth !== 'undefined' ? window.innerHeight : 0

function NodeLabel(node) {
    const { nodeData } = node;
    const hasChildren = nodeData.children;

    console.log("nodeData", node);

    const btnStyle = {
        background: hasChildren ? "#03A9F4" : "",
        cursor: hasChildren ? "pointer" : "default"
    };
    return (
        <button className="btn" style={btnStyle}>
            {nodeData.name}
        </button>
    );
}


export function OrgChartTreeTabPanel({ project, backendProject }) {
    console.log(project, "<<<<<<<<<<<<<<<<<<<<<<<<+++++++++++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(backendProject, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    const d3Data = convertToD3Format({ project: project, backendProject: backendProject });
    console.log(d3Data, "+++++++++++++++++++++++++++");

    const treeContainer = useRef();
    const tree = useRef();

    const [dimensions, setDimensions] = useState({
        width: innerWidth,
        height: innerHeight
    });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (treeContainer.current) {
            setDimensions(treeContainer.current.getBoundingClientRect());
        }
    }, [treeContainer]);

    useEffect(() => {
        console.log(dimensions);
        setTranslate({
            x: dimensions.width / 2,
            y: dimensions.height / 2 / 2
        });
    }, [dimensions]);

    console.log("tree", tree);


    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        // <div id="treeWrapper" className="flex bg-white px-6 h-screen justify-center items-center">
        //     <Tree data={d3Data} zoomable={true} />
        // </div>

        <div
            id="treeWrapper"
            ref={treeContainer}
            className="flex bg-white px-6 h-screen justify-center items-center"
        >
            <Tree
                data={d3Data}
                ref={tree}
                collapsible={true}
                translate={translate}
                // zoom={0.5}
                nodeSvgShape={nodeSvgShape}
                orientation="horizontal"
                style={{ height: "600px", width: "600px" }}
                allowForeignObjects
                nodeLabelComponent={{
                    render: <NodeLabel />,
                    foreignObjectWrapper: {
                        y: -10,
                        x: -50
                    }
                }}
            />
        </div>


    );
}