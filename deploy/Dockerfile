# run this from folder above (base project folder)
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY src/Analysim.Web/bin/Release/net6.0/publish/ .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet Analysim.Web.dll
