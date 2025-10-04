import { logger } from '../logger/Logger';
import { formateDate } from '../utils/dateFormat';

module.exports = function (sequelize, DataTypes) {
  const Stock = sequelize.define(
    'Stock',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      srNo: {
        type: DataTypes.BIGINT,
      },
      adjustSrNo: {
        type: DataTypes.BIGINT,
      },
      adjustType: {
        type: DataTypes.BIGINT,
      },
      refId: {
        type: DataTypes.BIGINT,
      },
      type: {
        type: DataTypes.BIGINT,
      },
      finishNo: {
        type: DataTypes.BIGINT
      },
      pieces: {
        type: DataTypes.BIGINT,
      },
      finalPieces: {
        type: DataTypes.BIGINT,
      },
      carat: {
        type: DataTypes.FLOAT,
      },
      finalCarat: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      value: {
        type: DataTypes.FLOAT,
      },
      lotNo: {
        type: DataTypes.STRING,
      },
      packetNo: {
        type: DataTypes.STRING,
      },
      type2a: {
        type: DataTypes.BIGINT,
      },
      isCertified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      boxId: {
        type: DataTypes.BIGINT
      },
      rapaport: {
        type: DataTypes.FLOAT,
      },
      discount: {
        type: DataTypes.FLOAT,
      },
      askPrice: {
        type: DataTypes.FLOAT,
      },
      entryDate: {
        type: DataTypes.DATE,
      },
      firstIssueDate: {
        type: DataTypes.DATE,
      },
      labReceiveDate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'The date when the lab received the stock',
      },
      saleDate: {
        type: DataTypes.DATE,
      },
      roughNo: {
        type: DataTypes.STRING,
      },
      finalRate: {
        type: DataTypes.FLOAT,
      },
      finalDisc: {
        type: DataTypes.FLOAT,
      },
      rfIdTag: {
        type: DataTypes.BIGINT,
      },
      certificateNo: {
        type: DataTypes.STRING,
      },
      blackInclusionId: {
        type: DataTypes.BIGINT,
      },
      depth: {
        type: DataTypes.FLOAT,
      },
      depthPer: {
        type: DataTypes.FLOAT,
      },
      diameter: {
        type: DataTypes.FLOAT,
      },
      diameterMax: {
        type: DataTypes.FLOAT,
      },
      diameterMin: {
        type: DataTypes.FLOAT,
      },
      fmId: {
        type: DataTypes.BIGINT,
      },
      fmLabId: {
        type: DataTypes.BIGINT,
      },
      inscription: {
        type: DataTypes.STRING,
      },
      labCountryId: {
        type: DataTypes.BIGINT,
      },
      length: {
        type: DataTypes.FLOAT,
      },
      lowerHalf: {
        type: DataTypes.FLOAT,
      },
      lowerHalves: {
        type: DataTypes.FLOAT,
      },
      markedAsPair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      markedAsExceptional: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      matchingPairSequence: {
        type: DataTypes.INTEGER,
      },
      matchingPairStoneId: {
        type: DataTypes.STRING,
      },
      pavilionAngle: {
        type: DataTypes.FLOAT,
      },
      pavilionHeight: {
        type: DataTypes.FLOAT,
      },
      pavilionInclusionId: {
        type: DataTypes.BIGINT,
      },
      pavilionOpenId: {
        type: DataTypes.BIGINT,
      },
      reportComments: {
        type: DataTypes.STRING,
      },
      biddingStartDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      biddingEndDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      biddingIssueDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      biddingIssueId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      reportInstruction: {
        type: DataTypes.STRING,
      },
      sizeGroup: {
        type: DataTypes.STRING,
      },
      starLength: {
        type: DataTypes.FLOAT,
      },
      tradeShow: {
        type: DataTypes.STRING,
      },
      width: {
        type: DataTypes.FLOAT,
      },
      widthPer: {
        type: DataTypes.FLOAT,
      },
      saleDiscount: {
        type: DataTypes.FLOAT,
      },
      saleRate: {
        type: DataTypes.FLOAT
      },
      saleAmount: {
        type: DataTypes.FLOAT
      },
      rapRate: {
        type: DataTypes.FLOAT,
      },
      rapAmount: {
        type: DataTypes.FLOAT,
      },
      rapDiscount: {
        type: DataTypes.FLOAT,
      },
      measurement: {
        type: DataTypes.STRING
      },
      crownAvg: {
        type: DataTypes.FLOAT
      },
      comments: {
        type: DataTypes.STRING,
      },
      colorDescription: {
        type: DataTypes.STRING
      },
      certificateDate: {
        type: DataTypes.DATE,
        set(value) {
          try {
            if(!value) return;
            const formattedDate = formateDate(value);
            if (formattedDate) {
              this.setDataValue('certificateDate', formattedDate);
            }
          } catch (error) {
            logger.error(error?.message);
          }
        }
      },
      companyId: {
        type: DataTypes.BIGINT,
      },
      departmentId: {
        type: DataTypes.BIGINT,
      },
      yearId: {
        type: DataTypes.BIGINT,
      },
      rapUpdateDate: {
        type: DataTypes.DATE
      },
      giaType2a: {
        type: DataTypes.BIGINT
      },
      discountUp: {
        type: DataTypes.FLOAT
      },
      discountDown: {
        type: DataTypes.FLOAT
      },
      stockCategoryId: {
        type: DataTypes.BIGINT
      },
      priceRevisionCount: {
        type: DataTypes.BIGINT
      },
      austSphNo: {
        type: DataTypes.STRING
      },
      austCode: {
        type: DataTypes.STRING
      },
      austPrice: {
        type: DataTypes.STRING
      },
      is970: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      internalGraining: {
        type: DataTypes.STRING
      },
      surfaceGraining: {
        type: DataTypes.STRING
      },
      imageExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      assetExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      certExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      arrowExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      heartExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      type2aExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      videoExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isFancy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      plotExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      roughPhotoExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      roughPlanExist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      reviseDate: {
        type: DataTypes.DATE
      },
      reviseHit: {
        type: DataTypes.BIGINT
      },
      reviseCount: {
        type: DataTypes.BIGINT
      },
      revisePer: {
        type: DataTypes.FLOAT
      },
      autoPrice: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      segomaLink: {
        type: DataTypes.STRING
      },
      stockTallyId: {
        type: DataTypes.BIGINT
      },
      consignmentStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      consignmentRefId: {
        type: DataTypes.BIGINT
      },
      accountId: {
        type: DataTypes.BIGINT,
      },
      termId: {
        type: DataTypes.BIGINT,
      },
      keyToSymbol: {
        type: DataTypes.STRING
      },
      labPersonId: {
        type: DataTypes.BIGINT,
      },
      memoTypeId: {
        type: DataTypes.BIGINT
      },
      memoNo: {
        type: DataTypes.STRING
      },
      reviseEstPrice: {
        type: DataTypes.FLOAT
      },
      reviseAge: {
        type: DataTypes.BIGINT
      },
      ratio: {
        type: DataTypes.FLOAT
      },
      mp4Exist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isSaleSeparable: {
        type: DataTypes.BIGINT,
      },
      isReceiveFromRepair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      centerInclusionId: {
        type: DataTypes.BIGINT
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // 1: Active, 0: Inactive( deleted or dead )
      },
      agKeyToSymbol: {
        type: DataTypes.STRING,
      },
      agKeyToSymbolIds: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
      },
      assortStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      boxNo: {
        type: DataTypes.BIGINT,
      },
      clarityId: {
        type: DataTypes.BIGINT,
      },
      colorId: {
        type: DataTypes.BIGINT,
      },
      culetId: {
        type: DataTypes.BIGINT,
      },
      culetSizeId: {
        type: DataTypes.BIGINT,
      },
      cutId: {
        type: DataTypes.BIGINT,
      },
      efcmId: {
        type: DataTypes.BIGINT,
      },
      effmId: {
        type: DataTypes.BIGINT,
      },
      extraFacetId: {
        type: DataTypes.BIGINT,
      },
      eyeCleanId: {
        type: DataTypes.BIGINT,
      },
      fancyColorId: {
        type: DataTypes.BIGINT,
      },
      featherId: {
        type: DataTypes.BIGINT,
      },
      fluorescenceId: {
        type: DataTypes.BIGINT,
      },
      fluorescenceColorId: {
        type: DataTypes.BIGINT,
      },
      fluorescenceIntensityId: {
        type: DataTypes.BIGINT,
      },
      girdleId: {
        type: DataTypes.BIGINT,
      },
      girdlePer: {
        type: DataTypes.FLOAT,
      },
      heartAndArrowId: {
        type: DataTypes.BIGINT,
      },
      ifrsNo: {
        type: DataTypes.BIGINT,
      },
      intensityId: {
        type: DataTypes.BIGINT,
      },
      keyToSymbolIds: {
        type: DataTypes.ARRAY(DataTypes.BIGINT)
      },
      labId: {
        type: DataTypes.BIGINT
      },
      labLocationId: {
        type: DataTypes.BIGINT,
      },
      labProcessId: {
        type: DataTypes.BIGINT
      },
      locationId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'Master',
          key: 'id',
        },
      },
      lusterId: {
        type: DataTypes.BIGINT,
      },
      milkyId: {
        type: DataTypes.BIGINT
      },
      nattsId: {
        type: DataTypes.BIGINT,
      },
      openCrownId: {
        type: DataTypes.BIGINT
      },
      openPavId: {
        type: DataTypes.BIGINT
      },
      openTableId: {
        type: DataTypes.BIGINT
      },
      overtoneId: {
        type: DataTypes.BIGINT,
      },
      shapeId: {
        type: DataTypes.BIGINT,
      },
      polishId: {
        type: DataTypes.BIGINT,
      },
      shapeName: {
        type: DataTypes.STRING
      },
      shadeId: {
        type: DataTypes.BIGINT,
      },
      sievesId: {
        type: DataTypes.BIGINT
      },
      subAssortStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      subSievesId: {
        type: DataTypes.BIGINT
      },
      symmetryId: {
        type: DataTypes.BIGINT,
      },
      tableInclusionId: {
        type: DataTypes.BIGINT,
      },
      origin: {
        type: DataTypes.BIGINT,
      },
      miningCoId: {
        type: DataTypes.BIGINT,
      },
      girdleThickness: {
        type: DataTypes.FLOAT,
      },
      remarks1: {
        type: DataTypes.TEXT,
      },
      remarks2: {
        type: DataTypes.TEXT,
      },
      remarks3: {
        type: DataTypes.TEXT,
      },
      bombayRemarks: {
        type: DataTypes.TEXT
      },
      tablePer: {
        type: DataTypes.FLOAT,
      },
      crownHeight: {
        type: DataTypes.FLOAT,
      },
      openInclusion: {
        type: DataTypes.BIGINT
      },
      girdleSizeMax: {
        type: DataTypes.FLOAT,
      },
      girdleSizeMin: {
        type: DataTypes.FLOAT,
      },
      transferDate: {
        type: DataTypes.DATE,
      },
      transferCarat: {
        type: DataTypes.FLOAT,
      },
      fmbarcode: {
        type: DataTypes.BIGINT,
      },
      frenchCuletOval: {
        type: DataTypes.BIGINT,
      },
      tracerId: {
        type: DataTypes.BIGINT,
      },
      proportionId: {
        type: DataTypes.BIGINT,
      },
      notePersonId: {
        type: DataTypes.BIGINT,
      },
      pavillionAvg: {
        type: DataTypes.FLOAT,
      },
      pavillionDepth: {
        type: DataTypes.FLOAT,
      },
      girdleBruted: {
        type: DataTypes.STRING,
      },
      rapNetAvailable: {
        type: DataTypes.STRING,
      },
      barcodeNo: {
        type: DataTypes.STRING,
      },
      bpfIssueDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      createdBy: {
        type: DataTypes.BIGINT,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      updatedBy: {
        type: DataTypes.BIGINT,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      deletedBy: {
        type: DataTypes.BIGINT,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'NO ACTION',
      },
      marketingAvailableAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      showId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      showIssueDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      showNameId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      countryOfPolishingId: {
        type: DataTypes.BIGINT,
      },
      mainLotNo: {
        type: DataTypes.STRING,
      },
      tracerTag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provenanceStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastBiddingDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastBiddingDisc: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      biddingCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    },
  );

  Stock.associate = function (models) {
    Stock.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'createdByData',
    });
    Stock.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updatedByData',
    });
    Stock.belongsTo(models.User, {
      foreignKey: 'deletedBy',
      as: 'deletedByData',
    });
  };

  return Stock;
};