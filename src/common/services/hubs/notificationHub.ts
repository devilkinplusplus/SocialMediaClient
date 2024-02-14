import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import { getUserIdFromToken } from "../utilities/jwtUtils";

const userId = getUserIdFromToken();

let connection: HubConnection;
// Initialize the connection
connection = new HubConnectionBuilder()
  .withUrl("https://localhost:7134/notification-hub")
  .build();

const startConnection = async (): Promise<void> => {
  try {
    await connection.start();
    console.log("Connection started successfully");
  } catch (error) {
    console.error("Error starting connection:", error);
  }
};

export const setConnectedUser = async (): Promise<void> => {
  try {
    // Ensure the connection is started before invoking
    if (connection?.state === HubConnectionState.Connected) {
      await connection.invoke("SetConnectedUserAsync", userId);
    } else {
      console.error(
        "Connection not in 'Connected' state. Cannot invoke method."
      );
    }
  } catch (error) {
    console.error("Error invoking SetConnectedUserAsync:", error);
  }
};

export const followNotification = async () => {
  try {
    startConnection()
    // Ensure the connection is started before invoking
    if (connection?.state === HubConnectionState.Connected) {
      await connection.invoke("SendFollowNotificationAsync");
    } else {
      console.error(
        "Connection not in 'Connected' state. Cannot invoke method."
      );
    }
  } catch (error) {
    console.error("Error invoking SetConnectedUserAsync:", error);
  }
};

// Start the connection
startConnection();

// Handle reconnection logic
connection.onclose((error) => {
  console.log("Connection closed:", error);
  // Additional reconnection logic if needed
});

// Cleanup or disconnect logic when needed
export const stopConnection = (): void => {
  connection.stop();
};

