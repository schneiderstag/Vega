using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Vega.Core.Models;

namespace Vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObject, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrWhiteSpace(queryObject.SortBy) || !columnsMap.ContainsKey(queryObject.SortBy))
                return query;

            if (queryObject.IsSortAscending)
                return query = query.OrderBy(columnsMap[queryObject.SortBy]);
            else
                return query = query.OrderByDescending(columnsMap[queryObject.SortBy]);

            //Code above translates into this:
            //if (queryObject.SortBy == "make")
            //    query = (queryObject.IsSortAscending) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
            //if (queryObject.SortBy == "model")
            //    query = (queryObject.IsSortAscending) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
            //if (queryObject.SortBy == "contactName")
            //    query = (queryObject.IsSortAscending) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
            //if (queryObject.SortBy == "id")
            //    query = (queryObject.IsSortAscending) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObject)
        {
            if (queryObject.Page <= 0)
                queryObject.Page = 1;

            if (queryObject.PageSize <= 0)
                queryObject.PageSize = 10;

            return query = query.Skip((queryObject.Page - 1) * queryObject.PageSize).Take(queryObject.PageSize);
        }
    }
}
