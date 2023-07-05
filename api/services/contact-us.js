const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+91', name: 'India' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
    { code: '+86', name: 'China' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+81', name: 'Japan' },
    { code: '+39', name: 'Italy' },
    { code: '+7', name: 'Russia' },
    { code: '+55', name: 'Brazil' },
    { code: '+52', name: 'Mexico' },
    { code: '+20', name: 'Egypt' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+234', name: 'Nigeria' },
    { code: '+27', name: 'South Africa' },
    { code: '+91', name: 'Greece' },
    { code: '+44', name: 'Serbia' },
    { code: '+389', name: 'Macedonia' }
    // Add more country codes and names as needed
];

// Sort countryCodes array alphabetically by name
countryCodes.sort((a, b) => a.name.localeCompare(b.name));

const countryCodeSelect = document.querySelector('#countryCode');
const phoneInput = document.querySelector('#phone');

countryCodes.forEach(function (country) {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = country.name;
    countryCodeSelect.appendChild(option);
});

countryCodeSelect.addEventListener('change', function () {
    const selectedCountryCode = countryCodeSelect.value;
    phoneInput.value = selectedCountryCode;
});

