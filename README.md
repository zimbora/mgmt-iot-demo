# mgmt-iot-demo

This project is a template to use mgmt-iot-web npm module [link](https://www.npmjs.com/package/mgmt-iot-web)
Start your project using this example.
A MySQL8.0 must be running. Check the previous link to load the db schema into it.

In order to use this dashboard you need at least one device running a dedicated firmware [link](https://github.com/zimbora/esp32-freeRTOS2) and a dedicated mqtt broker compatible with this project [link](https://github.com/zimbora/mqtt-broker-auth)

## Credentials

At any moment if no login account exists or doesn't have admin privileges, the following credentials can be used
- user: admin
- password : admin

They will always work and grant admin access, until a new account with admin privileges is registered

This can be done adding an user with level 5 and associate a client account to it
