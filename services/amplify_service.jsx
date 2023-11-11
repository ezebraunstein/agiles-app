import AWS from "aws-sdk";
import Constants from "expo-constants";



const { REACT_APP_ACCESS_KEY, REACT_APP_SECRET_ACCESS_KEY } = Constants.expoConfig.extra;

AWS.config.update({
    region: "us-east-1",
    accessKeyId: REACT_APP_ACCESS_KEY,
    secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

class AmplifyService {
  
  async fetchProductInformation(code){
      return await fetchProductInformation(code)
  }

  async fetchEqualProductsInformation(hasProduct, selectedFilter){
    return await fetchEqualProductsInformation(hasProduct, selectedFilter)
  }

}

export default new AmplifyService();

const fetchEqualProductsInformation = async (hasProduct, selectedFilter) => {
  return new Promise(async (resolve, reject) => {
    let filterExpression = "category = :category AND NOT code = :code";
    let expressionAttributeValues = {
      ":category": hasProduct.category,
      ":code": hasProduct.code,
    };

    switch (selectedFilter.value) {
      case '1': // TACC
        filterExpression += " AND hasTacc = :hasTacc";
        expressionAttributeValues[":hasTacc"] = false;
        break;
      case '2': // Vegan
        filterExpression += " AND hasVegan = :hasVegan";
        expressionAttributeValues[":hasVegan"] = false;
        break;
      case '3': // Lactose-Free
        filterExpression += " AND hasLactose = :hasLactose";
        expressionAttributeValues[":hasLactose"] = false;
        break;
    }

    const params = {
      TableName: "Product-qarcfxr6avge5pqqxdgi75roxi-staging",
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    try {
      const items = await scanDatabase(params);
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

const scanDatabase = async (params) => {
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, items) => {
      if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
};

const fetchProductInformation = async (code) => {
    return new Promise(async (resolve, reject) => {
      const params = {
        TableName: "Product-qarcfxr6avge5pqqxdgi75roxi-staging",
        FilterExpression: "code = :code",
        ExpressionAttributeValues: {
          ":code": code,
        },
      };
    
      try {
        const items = await scanDatabase(params);
        resolve(items);
      } catch (error) {
        reject(error);
      }
    });
}
