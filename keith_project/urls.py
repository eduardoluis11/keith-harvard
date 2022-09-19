"""keith_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
""" I will need to include the libraries “include” and “path(include(URL))” so that my code detects my templates 
(source: https://youtu.be/pRNhdI9PVmg ). 

I will need to use "+" and a long string of characters in "urlspatterns" to upload images to "media" folder in 
my Django project: (source: https://www.youtube.com/watch?v=ygzGr51dbsY ). And, of course, I will have to include
the appropriate library.

"""
from django.contrib import admin
from django.urls import path, include

# This imports the "settings" and "static" functions
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('keith_app.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
