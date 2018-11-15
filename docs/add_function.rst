=======================
How to add new function
=======================

If you want to add new function to LibamtrackWeb all you need is to follow this steps:

1. Prepare special JavaScript wrapper function to use compiled from C library function. Use generator `WrapperFunctionGenerator`_.

2. Prepare JSON that describes functions and put it in directory */src/static/json/<category_name>/*. See details in :ref:`funjson`.

3. Add all required dictionaries to */src/static/json/dictionaries/*. See details in :ref:`dictjson`.

4. Prepare new category or add function to existing one in :ref:`gcjson`.

5. Rebuild app and test :)
