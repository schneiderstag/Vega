﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Vega.Core;
using Vega.Core.Models;
using Vega.Extensions;

namespace Vega.Persistance
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObject) 
        {
            var result = new QueryResult<Vehicle>();
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .AsQueryable();

            query = query.ApplyFiltering(queryObject);

            //Expression tree (dictionary) to map the sorting columns to the linq expressions
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>() // object because we can then reference any property of the vehicle and not only string properties.
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                //["id"] = v => v.Id
            };
            query = query.ApplyOrdering(queryObject, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObject);

            result.Items = await query.ToListAsync();

            return result;
        }
    }
}