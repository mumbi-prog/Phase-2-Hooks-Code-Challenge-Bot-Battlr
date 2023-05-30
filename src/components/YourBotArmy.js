import React from "react";
import BotCard from "./BotCard";

//Defining the component
function YourBotArmy({bots, handleClick, deleteBot}) {
  //your bot army code here...
 
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
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {/*...and here...*/renderedBotCard}
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
