using System.ComponentModel;
using Microsoft.Practices.Unity;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.Practices.ServiceLocation;
using SimpleBookStore.DAL;
using SimpleBookStore.Managers;
using Unity.WebApi;

namespace SimpleBookStore
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
            container.RegisterType<IAuthorRepository, AuthorRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IBookRepository, BookRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IBookStoreManager, BookStoreManager>();

            ServiceLocator.SetLocatorProvider(() => new UnityServiceLocator(container));
        }
    }
}