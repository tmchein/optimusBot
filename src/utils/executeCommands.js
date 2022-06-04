const COMMANDS = {
  p: (data, command) => executeCommand(data, command),
  play: (data, command) => executeCommand(data, command),
  leave: (data, command) => executeCommand(data, command),
  pause: (data, command) => executeCommand(data, command),
  resume: (data, command) => executeCommand(data, command),
  skip: (data, command) => executeCommand(data, command),
  help: (data, command) => executeCommand(data, command),
  twitazo: (data, command) => executeCommand(data, command),
  rol: (data, command) => executeCommand(data, command),
  pc: (data, command) => executeCommand(data, command),
  dr: (data, command) => executeCommand(data, command)
};

const executeCommand = ({ client, message, args, songList }, commandName) => {
  if (!COMMANDS[commandName]) return;
  return client.commands.get(commandName).execute(client, message, args, songList);
};

module.exports = COMMANDS;
