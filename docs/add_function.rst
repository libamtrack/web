=======================
How to add new function
=======================

If you want to add new function to LibamtrackWeb all you need is to follow this steps:

1. Prepare special JavaScript wrapper function to use compiled from C library function. Use `JSFunctionGenerator`_ to quickly get wrapper method from C function's signature.
More details how to use this tool you can find clicking green button 'show help' on the tool's page.

.. warning:: During development remember to restart your local server, because auto import plugin generates dependencies to functions during start.

2. Put wrapper function into */src/functionsFromC* directory.

3. Prepare JSON that describes functions. See details in :ref:`funjson`.

4. Put prepared JSON into directory */src/static/json/<category_name>/*

5. Add all required dictionaries to */src/static/json/dictionaries/*. See details in :ref:`dictjson`.

6. Prepare new category or add function to existing one in :ref:`gcjson`, which can be found in */src/static/json/GlobalConfig.json*.

7. Rebuild app and test :)
