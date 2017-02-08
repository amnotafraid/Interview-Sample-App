<a id="top"></a>
# Interview-Sample-App

* [Introduction](#intro)

* [Build the Code](#build)

* [Run the Code](#run)

* [References](#reference)

* [Host the Code](#host)

<a id="intro"></a>
##Introduction [top](#top)

The request was as follows: 
> We want to test your mettle. So - we ask that you submit a pull request to our GitHub project of a small sample app that does the following:

> * Uses Bootstrap with either AngularJS or Vue.js
> * Create a single page web app that pulls information from a REST API and displays it to the user. There should be at least 2 routes: 1 that provides an item list for the user to select, the other should provide details about that item.

The application that I built uses [NDFD WSDL](http://graphical.weather.gov/xml/) to get weather information in a MEAN stack application, although MEAN stack is a bit of an overstatement because I ripped the Mongo stuff out of the backend because I don't store any data.

It looks like this:

![interviewapp](https://cloud.githubusercontent.com/assets/1727761/22729172/2b7e8102-eda7-11e6-8a16-52c5d144ed75.png)


<a id="build"></a>
##Build the Code [top](#top)
Some version info:

```
node -v
v6.0.0
/**
 * @license AngularJS v1.5.11
 * (c) 2010-2017 Google, Inc. http://angularjs.org
 * License: MIT
 */
npm -v express
3.8.6
```
If you have Node, Bower, Compass, and Git installed on a Mac OSX computer, you can deploy the MeanSeed application as follows. These directions should work for a Windows environment with some modifications.

First, clone the code.

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
| The weather service seems to have about a g-zillion different acronyms.  It is a genuine SOAP service, as opposed to being a REST API. | [NDFD/NOAA/NWSNDFD](http://www.nws.noaa.gov/ndfd/technical.htm) |
| Zippopotom.us is a free web service for getting lat/long from a zipcode | [Zipopotam.us](http://www.zippopotam.us/) |
| SoapUI is a handy application for deciphering and testing WSDLs  | [SoapUI](https://www.soapui.org/)  |
| Herong's tutorials will help you figure out SoapUI and learn about free web services  | [Free Web Services - Herong's Tutorial Examples](http://www.herongyang.com/Free-Web-Service/index.html)  |
| This post was really useful in figuring out how to deal with SOAP APIs and XML in Node.js | [Jowanza Joseph](http://www.jowanza.com/post/125602755114/dealing-with-soap-apis-in-nodejs) |

*_Using_* a WSDL is a lot different from *_developing_* a WSDL.  If you've got to do that, I found this fabulous tutorial, understatedly referred to as a 'primer', from W3C:  [W3C WSDL Primer](https://www.w3.org/TR/wsdl20-primer/)

<a id="host"></a>
##Host the code [top](#top)
I have instruction on how to host this code [here](https://amnotafraid.gitbooks.io/i-mean-it/content/hosting_on_bitnami.html)

