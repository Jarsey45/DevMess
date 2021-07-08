import React from "react"
import { ChatData } from "../../types/interfaces"

//TODO redundancy for chat component, fix this later
const TeamChatFView: React.FC<ChatData> = ({ _id, _name }) => {

  return (
    <>
      Team ID: {_id} <br />
      Team Name: {_name}
    </>
  )
}

export default TeamChatFView