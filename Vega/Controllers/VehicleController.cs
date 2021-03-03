using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistance;

namespace Vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContext context;

        public VehicleController(IMapper mapper, VegaDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
        
        [HttpPut("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await context.Vehicles.Include(vehicle => vehicle.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);

            if (vehicle == null)
                return NotFound();

            context.Remove(vehicle);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpGet]// /api/vehicles
        public async Task<IActionResult> GetVehicles()
        {
            var vehicles = await context.Vehicles.Include(v => v.Features).ToListAsync();
            var vehicleResources = new List<VehicleResource>();

            foreach (var v in vehicles)
            vehicleResources.Add(mapper.Map<Vehicle, VehicleResource>(v));

            return Ok(vehicleResources);
        }
    }
}
