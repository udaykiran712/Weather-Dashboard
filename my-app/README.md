WEATHER DASHBOARD

App Live Link: https://heartfelt-macaron-7cae15.netlify.app/

This website provides the weather forecast based on the city name provided.

Initially, the page consists a input box to provide the city name and a search button.

To get the weather forecast , Enter a city name and click on the search button.

When the search button gets clicked, a GET request is triggered to the integrated openweathermap API and results will be  displayed accordingly.
Results will be displayed based on the current API Status,
--> During the API request time a loader spinner is displayed.
--> upon successful integration the weather Forecast will be displayed.
--> If the API request gets failed an Alert message will be displayed.

The Results will be:
--> current Temperature, weather condition and a weather icon related to the weather condition.
--> Next, A 5-Day weather Forecast will be displayed which contains the day, weather condition icon , high Temp and Low Temp.

By Default all the temperatures will be in Degrees(&deg;C).
To Convert into Fahrenheit(&deg;F) A Toggle button is provided to change from Celcius To Fahrenheit and Vice Versa. 

--> All the details in Weather Forecast like high Temp, Low Temp are calculated at the end of the particular day.
The Current Weather is calculated approxiamately to the nearest TimeStamp provided by the openweathermap.