"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import DisplayComponent from "./Display";

export const InputOuput = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/gemini", {
        prompt: prompt,
      });

      const result = res.data.message;
      const parsedMessage = JSON.parse(result);

      console.log(parsedMessage);
      setResponse(parsedMessage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="rounded-lg border border-[#3D3D3F] p-3">
        <Textarea className=" outline-0 outline-none" onChange={handleChange} />
        <div className="flex justify-between p-3">
          <Input type="file" width={3} size={23} />
          <Button onClick={handleSubmit} className="text-end">
            Send
          </Button>
        </div>
      </div>

      <div className="text-black m-3">
        <div className="w-full">
          {response ? (
            <DisplayComponent responseData={response} />
          ) : (
            <p className="text-xl font-bold text-white">
              No data to display yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
