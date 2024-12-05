/*export const checkMethodPaymentExist = async (name) => {

    const nameNormalize = await normalizeInput(name);

    const query = `
    SELECT 1
    FROM payment_method
    WHERE name = $1
    LIMIT 1
  `;
}

export const createMethodPayment = (name, description) => {
    const query = `
    INSERT INTO payment_methods (name, description)
    VALUES ($1, $2)
  `;
}*/