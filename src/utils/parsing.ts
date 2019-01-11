import * as joiBase from 'joi-browser';
import * as joiExt from 'joi-date-extensions';

import { JobFairJSON, JobFairPackageJSON } from 'src/models/jobfair';

const joi = joiBase.extend(joiExt);

const jobFairSchema = joi.object().keys({
  Fairs: joi.array().items(
    joi.object().keys({
      Fair: joi.string(),
      StartDate: joi.date().format('DD/MM/YYYY'),
      EndDate: joi.date().format('DD/MM/YYYY'),
      StartTime: joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/),
      EndTime: joi.string().regex(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/),
      Place: joi.string(),
      About: joi.string(),
    }),
  ),
  Locations: joi.array().items(
    joi.object().keys({
      Place: joi.string(),
      Location: joi.array().items(
        joi.object().keys({
          Name: joi.string(),
        }),
      ),
    }),
  )
});

const packageSchema = joi.object().keys({
  Packages: joi.array().items(
    joi.object().keys({
      Title: joi.string(),
      Content: joi.array().items(joi.string()),
      VideoPromotion: joi.number(),
      NoLessons: joi.number(),
      NoWorkchops: joi.number(),
      NoPresentation: joi.number(),
      Price: joi.number(),
      MaxCompanies: joi.number().allow('-'),
    }),
  ),
  Additional: joi.array().items(
    joi.object().keys({
      Title: joi.string(),
      Price: joi.number(),
    }),
  ),
});

export const validate = (input, validationSchema) => {
  const result = joi.validate(input, validationSchema);

  if (result.error) {
    throw {
      message: result.error.message,
    };
  }

  return result.value ? result.value : {};
}

export const validateJobFairJSON = (input: any): JobFairJSON => validate(input, jobFairSchema);
export const validatePackageJSON = (input: any): JobFairPackageJSON => validate(input, packageSchema);

export const jobfairJSON = {
  "Fairs": [
    {
      "Fair": "JobFair2019",
      "StartDate": "01/03/2019",
      "EndDate": "03/03/2019",
      "StartTime": "09:00:00",
      "EndTime": "17:00:00",
      "Place": "ETF Beograd",
      "About": "Kreiraj svoju buducnost!"
    }
  ],
  "Locations": [
    {
      "Place": "ETF Beograd",
      "Location": [
        {
          "Name": "Amfiteatar 56"
        },
        {
          "Name": "Amfiteatar 65"
        },
        {
          "Name": "Laboratorija 60"
        },
        {
          "Name": "Svecana sala - Arhitektura"
        },
        {
          "Name": "Ucionica 310"
        },
        {
          "Name": "Ucionica 311"
        }
      ]
    }
  ]
};

export const packagesJSON = {
  "Packages": [
    {
      "Title": "Generalni pokrovitelj",
      "Content": ["Stand 4x velicine", "Logo i 2 strane u boji u brosuri", "Logo na promo majicama trostruke velicine"],
      "VideoPromotion": 15,
      "NoLessons": 2,
      "NoWorkchops": 1,
      "NoPresentation": 0,
      "Price": 30000,
      "MaxCompanies": 1
    },
    {
      "Title": "Zlatni pokrovitelj",
      "Content": ["Stand 3x velicine", "Logo i 2 strane u boji u brosuri", "Logo na promo majicama 3x velicine"],
      "VideoPromotion": 10,
      "NoLessons": 1,
      "NoWorkchops": 1,
      "NoPresentation": 1,
      "Price": 25000,
      "MaxCompanies": 1
    },
    {
      "Title": "Srebrni pokrovitelj",
      "Content": ["Stand 2x velicine", "Logo i 2 strane u boji u brosuri", "Logo na promo majicama 2x velicine"],
      "VideoPromotion": 5,
      "NoLessons": 1,
      "NoWorkchops": 0,
      "NoPresentation": 1,
      "Price": 20000,
      "MaxCompanies": 2
    },
    {
      "Title": "Bronzani pokrovitelj",
      "Content": ["Stand 2x velicine", "Logo i 1 strane u boji u brosuri", "Logo na promo majicama standardne velicine"],
      "VideoPromotion": 3,
      "NoLessons": 1,
      "NoWorkchops": 0,
      "NoPresentation": 0,
      "Price": 15000,
      "MaxCompanies": 3
    },
    {
      "Title": "Standardni paket",
      "Content": ["Stand 1x velicine", "Logo i osnovne info u brosuri"],
      "VideoPromotion": 0,
      "NoLessons": 0,
      "NoWorkchops": 0,
      "NoPresentation": 0,
      "Price": 10000,
      "MaxCompanies": "-"
    }
  ],
  "Additional": [
    {
      "Title": "Flajer u brosuri",
      "Price": 4000
    },
    {
      "Title": "Prednja unutrasnja korica brosure",
      "Price": 2000
    },
    {
      "Title": "Dodatna strana u boji u brosuri",
      "Price": 3000
    },
    {
      "Title": "Doplata za brendiranje standa",
      "Price": 5000
    },
    {
      "Title": "Dodatna rezentacija kompanije u trajanju 45min",
      "Price": 10000
    }
  ]
}