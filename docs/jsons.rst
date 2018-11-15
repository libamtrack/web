===================
JSONs Configuration
===================

.. _gcjson:

Global Configuration JSON
=========================

Global configuration JSON file looks like below

.. code-block:: json

    {
        "applicationTitle": "Libamtrack",
        "introText": "libamtrack provides computational routines for the prediction of detector response and radiobiological efficiency in heavy charged particle beams.",
        "footerText": "LibatrackWeb ©2018",
        "categories": [],
        "dictionaries": [],
    }

* **applicationTitle** - title of web application

* **introText** - short application description displayed in main page

* **footerText** - footer - text displayed on end section

Categories
----------

Categories is an array that contains functions grouped in theme categories and optionally customized styles.

.. code-block:: json

    {
        "categories": [
            {
                "name": "Physics Routines",
                "style": {
                    "background": "red",
                    "border": "red",
                    "color": "black",
                    "font-size": "20px"
                },
                "functionsStyle": {
                    "color": "red"
                },
                "functions": [
                    {
                        "name": "Beta From Energy Single",
                        "jsonConfigPath": "/PhysicsRoutines/BetaFromESingle.json"
                    }
                ]
            }
        ]
    }

* **name** - category name which will be displayed in application

* **style** - customizable CSS for displayed category column on the main page

* **functionsStyle** - customizable CSS for each function in category column

Functions
~~~~~~~~~
 
An array which contains all functions in given category:

* **name** - displayed name for function

* **jsonConfigPath** - path for JSON file which contains function's details. Format: /<category_name>/<function_name>.json


Dictionaries
------------

An array which contains all dictionary JSONs used by web application

.. code-block:: json
    
    {
        "dictionaries": [
            {
                "name": "particles",
                "jsonConfigPath": "/dictionaries/Particles.json" 
            }
        ]
    }

* **name** - dictionary name which is used in functions JSON

.. note:: This name must be equal with the name used in functions configuration JSONs.

* **jsonConfigPath** - path to JSON which contains dictionary values: Format: /dictionaries/<dictionary_name>.json


.. _funjson:

Function description JSON
=========================

In this file you can describe all parameters which are needed to generate form for your function.

.. code-block:: json

    {
        "visibleName": "Mass stopping power with no",
        "functionName": "AT_Mass_Stopping_Power_with_no",
        "description": "Retrieves the electronic mass stopping power in MeV*cm2/g for the requested energies and particles for a specified material and data source.",
        "xTitle": "Energy [MeV]",
        "yTitle": "Mass stopping power [MeV*cm2/g]",
        "plot": true,
        "unit": null,
        "formItems": [],
        "moreOptions": true,
        "modals": {
            "dataSeries": true,
            "download": true,
            "deleteAll": true
        }
    }


* **visibleName** - name which will be displayed on function page

* **functionName** - C/wrapper function name which you will have to generate

.. warning:: This value MUST BE equal with JavaScript function name you put in src/functionsFromC

* **description** - short description what function does, it appears on function page

* **xTitle**/**yTitle** - x/y axis labels

* **plot** - flag that descrbes whether function return results on plot (true) or as single value (false)

* **unit** - units for function that return single results

* **formItems** - items for for described in :ref:`formitems`

* **moreOptions** - flag that describes whether to display buttons for changing axis type (linear/logarithmic)

* **modals** - contains flags describing which modal will be displayed on function page

Modals
------

.. _formitems:

Form Items
----------

.. _dictjson:

Dictionary JSON
===============

Dictionary JSON is an array which contains dictionary values as objects. Each dictionary is listed in web application in order provided
in this file.

.. code-block:: json

  [
    {
        "name": "H",
        "value": 1001
    }
  ]

*  **name** - dictionary name - it will be displayed in application

* **value** - value e.g. number which will be used in calculations

.. note:: Couple name-value should be unique in one dictionary.