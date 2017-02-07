<a id="top"></a>
# Interview-Sample-App

* [Introduction](#intro)

* [Build the Code](#build)

* [Run the Code](#run)

* [References](#reference)

* [Host the Code](#host)

<a id="intro"></a>
##Introduction [top](#top)

I wanted to learn about WSDL (pronounced wiz-dull) format, so I set out to use one.

This uses [NDFD WSDL](http://graphical.weather.gov/xml/) to get weather information in a MEAN stack application.  [US Census Geocoder](https://geocoding.geo.census.gov/) converts a US address to lat and long, and  [angular-google-maps](https://angular-ui.github.io/angular-google-maps/#!/) shows a map.

At first, I thought the US Census Geocoder and angular-google-maps were going to help me learn about WSDLs, but they're not WSDLs.  The Geocoder thing is a REST API.  I just smack some URL parameters on the back of a URL and do a request, and it responds with some nice JSON data.  With angular-google-maps, it's even simpler.  It all happens on the client side.  You just hand it a lat and long and a few other parameters, stick it in a div, and you've got a map.

The weather thing *_is_* a WSDL.  I had to create a SOAP client with the NDFD WSDL XML, and then thread through the responding XML.

One more thing, calling this a MEAN application is a bit of a misnomer.  M stands for Mongo.  I don't store any data, so I'm not using Mongo.  I think I tore all the database stuff out of this thing after I cloned it from [MeanSeed](https://github.com/amnotafraid/MeanSeed).  I guess it's an EAN stack application.
<a id="build"></a>
##Build the Code [top](#top)
Some version info:

```
node -v
v6.0.0
/**
 * @license AngularJS v1.5.10
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * LLicense: MIT
 */
 npm -v express
3.8.6
```
If you have Node, Bower, Compass, and Git installed on a Mac OSX computer, you can deploy the MeanSeed application as follows. These directions should work for a Windows environment with some modifications.

First, clone the MeanGeo code. In the directory where you want the root, do a git clone. It will create a MeanSeed directory and get all the code inside that directory:
```
git clone https://github.com/amnotafraid/MeanGeo.git
```
In the MeanGeo/client directory, install the software needed like this:
```
npm install
bower install jquery
```
In the MeanGeo/server directory:
```
npm install
```
<a id="run"></a>
##Run the code [top](#top)
Start the software in the client directory, MeanGeo/client:
```
grunt serve
```
This should open a browser at localhost:9000, but you can close it because you don't need it. 
Start the software in the server directory, MeanGeo/server:
```
npm test
```
Open up a browser at http://localhost:3000. You should see your app:

<a id="references"></a>
##References [top](#top)

Here's a few references that I found helpful for figuring things out:

| Description  | Link |
| ------------- | ------------- |
| SoapUI is a handy application for deciphering and testing WSDLs  | [SoapUI](https://www.soapui.org/)  |
| Herong's tutorials will help you figure out SoapUI and learn about free web services  | [Free Web Services - Herong's Tutorial Examples](http://www.herongyang.com/Free-Web-Service/index.html)  |
| This post was really useful in figuring out how to deal with SOAP APIs and XML in Node.js | [Jowanza Joseph](http://www.jowanza.com/post/125602755114/dealing-with-soap-apis-in-nodejs) |

*_Using_* a WSDL is a lot different from *_developing_* a WSDL.  If you've got to do that, I found this fabulous tutorial, understatedly referred to as a 'primer', from W3C:  [W3C WSDL Primer](https://www.w3.org/TR/wsdl20-primer/)


<a id="front-page">
##</a> [top](#top)

![meangeofrontpage](https://cloud.githubusercontent.com/assets/1727761/21756775/49639c26-d5eb-11e6-9b54-5cc0c8057e36.png)

After you enter a US address, you can look for a map, the JSON code for the weather, or the weather.
![withlatlong](https://cloud.githubusercontent.com/assets/1727761/21756803/9ca66c74-d5eb-11e6-8dbf-9f9f4145b2ee.png)
<a id="host"></a>
##Host the code [top](#top)
I have instruction on how to host this code [here](https://amnotafraid.gitbooks.io/i-mean-it/content/hosting_on_bitnami.html)

