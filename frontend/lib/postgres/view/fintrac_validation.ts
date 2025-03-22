"use server"
import { db } from "../db";

const getValidationRules = async () => {
  try {
    return await db.any(`
      SELECT 
        field_id,
        field_name,
        rule_id,
        rule_type,
        action,
        rule_note,
        message,
        message_id,
        condition,
        description,
        valid_values
      FROM validation_rules
    `);
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching validation_rules: " + e);
  }
};

// country_code query
const getCountryCodes = async () => {
  try {
    return await db.any("SELECT code, description FROM country_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching country_codes: " + e);
  }
};

// currency_code query
const getCurrencyCodes = async () => {
  try {
    return await db.any("SELECT code, description FROM currency_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching currency_codes: " + e);
  }
};

// fund_asset_virtual_currency_type_code query
const getFundAssetCurrencyType = async () => {
  try {
    return await db.any("SELECT Code, description FROM fund_asset_virtual_currency_type_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching fund_asset_virtual_currency_type_code: " + e);
  }
};

// province_state_code query
const getProvinceStateCodes = async () => {
  try {
    return await db.any("SELECT Code, country, description FROM province_state_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching province_state_codes: " + e);
  }
};

// entity_identifier_type_code query
const getEntityIdentifierTypes = async () => {
  try {
    return await db.any("SELECT code, description FROM entity_identifier_type_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching entity_identifier_type_codes: " + e);
  }
};

// account_type_code query
const getAccountTypeCodes = async () => {
  try {
    return await db.any("SELECT code, description FROM account_type_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching account_type_codes: " + e);
  }
};

// virtual_currency_type_code query
const getVirtualCurrencyTypes = async () => {
  try {
    return await db.any("SELECT code, description FROM virtual_currency_type_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching virtual_currency_type_codes: " + e);
  }
};

// activity_sector_code query
const getActivitySectorCodes = async () => {
  try {
    return await db.any("SELECT code, description FROM activity_sector_code");
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching activity_sector_codes: " + e);
  }
};

// Exporting all constants for use elsewhere in the app
export {
  getCountryCodes,
  getCurrencyCodes,
  getFundAssetCurrencyType,
  getProvinceStateCodes,
  getEntityIdentifierTypes,
  getAccountTypeCodes,
  getVirtualCurrencyTypes,
  getActivitySectorCodes,
  getValidationRules
};
