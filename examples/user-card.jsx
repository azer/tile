import React from "react";
import { HStack, VStack, View, style } from "tile";

export function UserCard(props) {
  return (
    <Container>
      <ProfilePhoto src={"https://cldup.com/JuBBlQRbI1.jpg"} />
      <User>
        <h1>{props.name || "Azer Koçulu"}</h1>
        {props.bio || "Founder of Sway and Ray Labs."}
      </User>
    </Container>
  )
}

const Container = HStack() // Horizontal stack
  .size(350, 200)
  .space({ gap: 20, inner: 16, outer: 24 })
  .border(10, { color: "#eee" })
  .round(18, { bottom: 0 }) // no rounded corners on the bottom
  .align({ y: "center" })
  .element()

const ProfilePhoto = View("img")
  .size(100, 100)
  .round("100%")
  .shadow()
  .element()

const User = VStack()
  .fg("#666")
  .sans(16, { leading: 1.25 })
  .select("h1", style().margin(0).fg("#222").text(28, { weight: 700, tracking: -2 }))
  .element()