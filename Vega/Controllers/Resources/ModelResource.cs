using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Controllers.Resources
{
    public class ModelResource : KeyValuePairResource
    {
        public KeyValuePairResource Make { get; set; }
    }
}
