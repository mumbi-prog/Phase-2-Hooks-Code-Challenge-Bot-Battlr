import React, { useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";


function BotsPage() {
  //Start of the code

    // step1: to satte variables
      const [botList, setBotList] = useState([]);
      const [pickedBots, setPickedBots] = useState([]);

    // step2: to fetch the bot list from the backend API
      const fetchBotList = async () => {
         try {
          // request to fetch the bot list
           const response = await fetch("http://localhost:8002/bots");
           
          // parse response 
           const botInfo = await response.json();
           
          // update bot list state 
           setBotList (botInfo);
          } 
          
          // to console.log an error should it occur when trying to fetch bot info
          catch (error) {
        console.error("Error fetching bot info:", error);
       }
     };

    // step3: to call fetchBotList
      useState(() => {
      fetchBotList();
      },
      []);

    // step4: to enlist a bot to the bot army
      const enlistBotToArmy = (bot) => {
        if (pickedBots.includes(bot)) {
           return;
      }

      setPickedBots((pickedBots) => 
      [...pickedBots, bot]);
      alert(`Bot: ${bot.bot_class} will be added`);
      };

    // step5: to remove a bot from the bot army
      const removeBotFromArmy = (bot) => {
         alert(`Bot: ${bot.bot_class} will be removed`);
         setPickedBots((pickedBots) => 
         pickedBots.filter((enlistBot) => 
        enlistBot.id !== bot.id));
      };

    // step6: to delete a bot from the backend API and update the bot lists
      const deleteBot = (bot) => {
        fetch(`http://localhost:8002/bots/${bot.id}`, {
          method: "DELETE",
        })
          .then(() => {
            // to filter out the deleted bot from the botList
            const updatedBotList = botList.filter((item) => 
            item.id !== bot.id);

            setBotList(updatedBotList);
  
            // to filter out the deleted bot from the pickedBots list
            const updatedPickedBots = pickedBots.filter(
              (pickedBot) => 
              pickedBot.id !== bot.id
            );
            setPickedBots(updatedPickedBots);
          })

          .catch((error) => {
            // to console.log an error should it occur when trying to delete a bot
            console.error("Error deleting bot:", error);
              });
       };

    // eslint-disable-next-line
      const handleDeleteButtonClick = (e, bot) => {
        e.stopPropagation();
        console.log(`Clicked on delete button: ${e}, ${bot}`);
        deleteBot(bot);
      };

  return (
    <div>
      <YourBotArmy
        bots={pickedBots}
        handleClick={removeBotFromArmy}
        handleDelete={deleteBot}
      />

      <BotCollection
        bots={botList}
        handleClick={enlistBotToArmy}
        handleDelete={deleteBot}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  );
}

export default BotsPage;