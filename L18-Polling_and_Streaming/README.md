# WEB SOCKETS STREAMING vs POLLING NOTES
## INSTRUCTIONS
1. install dependencies (axios, express, express-ws, ws, readline)

2. open four terminals, in one terminal run your node server (node server.js file)

3. in bottom left terminal, we're going to be streaming. run client.js file with code below:
   MODE=stream NAME=Harry node client.js

4. in bottom right terminal, we're going to be polling:
  MODE=poll NAME=Mosey node client.js

5. in the bottom right, notice if we start typing in moseys chat box, 
the message shows up instantly on Harry's chat box because harry is streaming

6. in the bottom left terminal, notice if we start typing in harrys chat box,
the messages dont show up until after 3 seconds (and they all show up at once)

7. in the top right terminal, type:
  (for i in `seq 1 10000`;do sleep 1; echo $i; done) | NAME=Bot node client.js
^ from 1 to 10k, sleep for a second, then echo i and pipe it to client
 sending numbers 1-10000 every second to chat room