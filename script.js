let propertyCount = 0;
const properties = [];

function addProperty() {
    propertyCount++;

    const propertyDiv = document.createElement("div");
    propertyDiv.className = "property";
    propertyDiv.innerHTML = `
        <h3>Property ${propertyCount}</h3>
        <label for="propertyType${propertyCount}">Property Type:</label>
        <input type="text" id="propertyType${propertyCount}" placeholder="Enter property type (e.g., Apartment, Villa)">
        <label for="price${propertyCount}">Price (INR):</label>
        <input type="number" id="price${propertyCount}" placeholder="Enter price in Indian Rupees">
        <label for="area${propertyCount}">Built-up Area (sq. ft.):</label>
        <input type="number" id="area${propertyCount}" placeholder="Enter built-up area">
        <label for="propertyAge${propertyCount}">Property Age (in years):</label>
        <input type="number" id="propertyAge${propertyCount}" placeholder="Enter property age">
        <label for="amenities${propertyCount}">Amenities:</label>
        <input type="text" id="amenities${propertyCount}" placeholder="List amenities (e.g., Pool, Gym)">
        <label for="propertyImage${propertyCount}">Property Image:</label>
        <input type="file" id="propertyImage${propertyCount}" accept="image/*">
        <label for="bedrooms${propertyCount}">Bedrooms:</label>
        <input type="number" id="bedrooms${propertyCount}" placeholder="Enter number of bedrooms">
        <label for="bathrooms${propertyCount}">Bathrooms:</label>
        <input type="number" id="bathrooms${propertyCount}" placeholder="Enter number of bathrooms">
        <label for="rating${propertyCount}">Rating (1-5):</label>
        <input type="number" id="rating${propertyCount}" placeholder="Rate the property">
    `;

    document.getElementById("properties").appendChild(propertyDiv);
}

function compareProperties() {
    properties.length = 0; // Clear the properties array

    for (let i = 1; i <= propertyCount; i++) {
        const property = {
            type: document.getElementById(`propertyType${i}`).value,
            price: parseFloat(document.getElementById(`price${i}`).value),
            area: parseFloat(document.getElementById(`area${i}`).value),
            propertyAge: parseInt(document.getElementById(`propertyAge${i}`).value),
            amenities: document.getElementById(`amenities${i}`).value,
            image: document.getElementById(`propertyImage${i}`).files[0],
            bedrooms: parseInt(document.getElementById(`bedrooms${i}`).value),
            bathrooms: parseInt(document.getElementById(`bathrooms${i}`).value),
            rating: parseInt(document.getElementById(`rating${i}`).value),
        };
        properties.push(property);
    }

    const comparisonResult = document.getElementById("comparisonResult");
    comparisonResult.innerHTML = "<h2>Comparison Result</h2>";

    if (properties.length < 2) {
        comparisonResult.innerHTML += "<p>Please add at least two properties for comparison.</p>";
        return;
    }

    // Find the property with the highest price
    const highestPriceProperty = properties.reduce((prev, current) => (prev.price > current.price ? prev : current));

    // Find the property with the largest area
    const largestAreaProperty = properties.reduce((prev, current) =>
        prev.area > current.area ? prev : current
    );

    // Find the property with the most bedrooms
    const mostBedroomsProperty = properties.reduce((prev, current) =>
        prev.bedrooms > current.bedrooms ? prev : current
    );

    // Find the property with the most bathrooms
    const mostBathroomsProperty = properties.reduce((prev, current) =>
        prev.bathrooms > current.bathrooms ? prev : current
    );

    comparisonResult.innerHTML += `
        <p>Highest Price Property: Property ${properties.indexOf(highestPriceProperty) + 1}</p>
        <p>Property with Largest Area: Property ${properties.indexOf(largestAreaProperty) + 1}</p>
        <p>Property with Most Bedrooms: Property ${properties.indexOf(mostBedroomsProperty) + 1}</p>
        <p>Property with Most Bathrooms: Property ${properties.indexOf(mostBathroomsProperty) + 1}</p>
    `;

    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        comparisonResult.innerHTML += `
            <div class="property-info">
                <h3>Property ${i + 1}</h3>
                <p>Type: ${property.type}</p>
                <p>Price: ₹${property.price.toLocaleString()}</p>
                <p>Area: ${property.area} sq. ft.</p>
                <p>Age: ${property.propertyAge} years</p>
                <p>Amenities: ${property.amenities}</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Rating: ${property.rating} stars</p>
                <img class="property-image" src="${URL.createObjectURL(property.image)}" alt="Property ${i + 1}">
            </div>
        `;
    }
}
