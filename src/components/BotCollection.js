import React from "react";
import BotCard from "./BotCard";

function BotCollection({bots, handleClick, deleteBot}) {
  // Your code here

  // step1: to iterate through bots array and creating BotCard components
      const renderedBotCard = bots.map((bot) => (
      <BotCard
        key={bot.id}
        bot={bot}
        handleClick={handleClick}
        handleDelete={deleteBot} 
      />
  ));

  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/renderedBotCard}
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
