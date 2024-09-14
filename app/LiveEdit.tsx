"use client";
import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export const LiveEdit = () => {
  const code = `
  const Header = styled.div\`
    color: palevioletred;
    font-size: 18px;
  \`

  render(<Header>{headerProps.text}</Header>)
`;
  return (
    <div>
      <LiveProvider code={code} noInline>
        <div className="grid grid-cols-2 gap-4">
          <LiveEditor className="font-mono" />
          <LivePreview />
        </div>
      </LiveProvider>
      ;
    </div>
  );
};
