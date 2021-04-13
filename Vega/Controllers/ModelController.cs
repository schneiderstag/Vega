using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Core.Models;
using Vega.Persistance;

namespace Vega.Controllers
{
    public class ModelController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public ModelController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/models")]
        public async Task<IEnumerable<ModelResource>> GetModels()
        {
            var models = await context.Models.Include(mapper => mapper.Make).ToListAsync();
            return mapper.Map<List<Model>, List<ModelResource>>(models);
        }
    }
}
