import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { init } from "../lib";

const { Frame, VStack, HStack, ScrollView, View } = init();

const FormContainer = Frame("90vw", "90vh")
  .bg("white")
  .border(1, { color: "rgba(0,0,0,0.1)" })
  .round(20)
  .shadow(0.2)
  .geometry({ maxWidth: 800 }, { background: "#f2f2f2" })
  .desktop({ background: "yellow" })
  .element();

const Content = ScrollView({ y: true }).padding(40).height("100%").element();

const VerticalStack = VStack().space({ gap: 20 }).element();

const Title = Frame()
  .text(32, { weight: "bold" })
  .padding({ bottom: 10 })
  .element();

const Description = Frame()
  .text(16, { color: "rgba(0,0,0,0.6)" })
  .padding({ bottom: 20 })
  .element();

const TextArea = View("textarea")
  .padding(10)
  .border(1, { color: "rgba(0,0,0,0.2)" })
  .round(8)
  .text(16)
  .element();

const SubmitButton = View("button")
  .bg("blue")
  .fg("white")
  .padding({ x: 20, y: 10 })
  .round(8)
  .text(16, { weight: "bold" })
  .transition(0.3)
  .onHover(View().bg("rgba(0,0,255,0.8)"))
  .element();

const ColumnContainer = HStack()
  .space({ gap: 20 })
  .padding({ top: 20 })
  .element();

const Column = Frame()
  .flex({ grow: 1 })
  .padding(20)
  .border(1, { color: "rgba(0,0,0,0.1)" })
  .round(8)
  .element();

const ColumnContent = VStack().align({ x: "center" }).element();

const Emoji = Frame().text(48).padding({ bottom: 10 }).element();

const ColumnText = Frame().text(14, { align: "center" }).element();

interface Props {
  title?: string;
}

export const App = (props: Props) => {
  return (
    <FormContainer>
      <Content>
        <VerticalStack>
          <Title>{props.title || "Cool Feedback Form"}</Title>
          <Description>
            We'd love to hear your thoughts! Please fill out the form below.
          </Description>
          <TextArea placeholder="Enter your feedback here..." />
          <SubmitButton>Submit Feedback</SubmitButton>
          <ColumnContainer>
            {[
              { emoji: "😊", text: "We value your happiness" },
              { emoji: "🚀", text: "Help us improve" },
              { emoji: "💡", text: "Share your ideas" },
              { emoji: "🙏", text: "Thank you for your time" },
            ].map((item, index) => (
              <Column key={index}>
                <ColumnContent>
                  <Emoji>{item.emoji}</Emoji>
                  <ColumnText>{item.text}</ColumnText>
                </ColumnContent>
              </Column>
            ))}
          </ColumnContainer>
        </VerticalStack>
      </Content>
    </FormContainer>
  );
};
