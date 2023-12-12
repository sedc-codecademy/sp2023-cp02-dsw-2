namespace CoffeeHouse_App.Mappers
{
    public static class ObjectMapper
    {
        public static void MapChanges<TSource, TDestination>(TSource source, TDestination destination)
        {
            var sourceProperties = typeof(TSource).GetProperties();
            var destinationProperties = typeof(TDestination).GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                var destinationProperty = destinationProperties.FirstOrDefault(p => p.Name == sourceProperty.Name);

                if (destinationProperty != null)
                {
                    var sourceValue = sourceProperty.GetValue(source);
                    var destinationValue = destinationProperty.GetValue(destination);

                    if (sourceValue != null && !sourceValue.Equals(destinationValue))
                    {
                        destinationProperty.SetValue(destination, sourceValue);
                    }
                }
            }
        }
    }
}
