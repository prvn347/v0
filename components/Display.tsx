import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const DisplayComponent = ({ responseData }) => {
  const { componentName, description, code, exampleUsage } = responseData;

  return (
    <div className="container mx-auto mt-10 p-4">
      {responseData.plainText ? (
        <h1 className=" text-neutral-300 text-lg font-bold">
          {responseData.plainText}
        </h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{componentName}</h1>

          <p className="text-gray-700 mb-4">{description}</p>

          <h2 className="text-xl font-semibold mb-2">Component Code:</h2>
          <SyntaxHighlighter language="jsx" style={dracula}>
            {code.replace(/```jsx/g, "").replace(/```/g, "")}
          </SyntaxHighlighter>

          <h2 className="text-xl font-semibold mb-2">Example Usage:</h2>
          <SyntaxHighlighter language="jsx" style={dracula}>
            {exampleUsage.replace(/```jsx/g, "").replace(/```/g, "")}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default DisplayComponent;
