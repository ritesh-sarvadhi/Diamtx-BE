'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stock', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      srNo: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      adjustSrNo: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      adjustType: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      refId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      type: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      finishNo: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      pieces: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      finalPieces: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      carat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      finalCarat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      lotNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      packetNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type2a: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      isCertified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      boxId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      rapaport: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      askPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      entryDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      firstIssueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      labReceiveDate: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'The date when the lab received the stock'
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      roughNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      finalRate: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      finalDisc: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      rfIdTag: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      certificateNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      blackInclusionId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      depth: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      depthPer: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      diameter: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      diameterMax: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      diameterMin: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fmId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fmLabId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      inscription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      labCountryId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      length: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      lowerHalf: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      lowerHalves: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      markedAsPair: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      markedAsExceptional: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      matchingPairSequence: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matchingPairStoneId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pavilionAngle: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      pavilionHeight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      pavilionInclusionId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      pavilionOpenId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      reportComments: {
        type: Sequelize.STRING,
        allowNull: true
      },
      biddingStartDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      biddingEndDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      biddingIssueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      biddingIssueId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reportInstruction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sizeGroup: {
        type: Sequelize.STRING,
        allowNull: true
      },
      starLength: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      tradeShow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      widthPer: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      saleDiscount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      saleRate: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      saleAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      rapRate: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      rapAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      rapDiscount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      measurement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      crownAvg: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: true
      },
      colorDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      certificateDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      companyId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      departmentId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      yearId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      rapUpdateDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      giaType2a: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      discountUp: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      discountDown: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      stockCategoryId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      priceRevisionCount: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      austSphNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      austCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      austPrice: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is970: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      internalGraining: {
        type: Sequelize.STRING,
        allowNull: true
      },
      surfaceGraining: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      assetExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      certExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      arrowExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      heartExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      type2aExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      videoExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isFancy: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      plotExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      roughPhotoExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      roughPlanExist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      reviseDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reviseHit: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      reviseCount: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      revisePer: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      autoPrice: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      segomaLink: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stockTallyId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      consignmentStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      consignmentRefId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      accountId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      termId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      keyToSymbol: {
        type: Sequelize.STRING,
        allowNull: true
      },
      labPersonId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      memoTypeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      memoNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reviseEstPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      reviseAge: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      ratio: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      mp4Exist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isSaleSeparable: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      isReceiveFromRepair: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      centerInclusionId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        comment: '1: Active, 0: Inactive( deleted or dead )'
      },
      agKeyToSymbol: {
        type: Sequelize.STRING,
        allowNull: true
      },
      agKeyToSymbolIds: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: true
      },
      assortStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      boxNo: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      clarityId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      colorId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      culetId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      culetSizeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      cutId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      efcmId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      effmId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      extraFacetId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      eyeCleanId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fancyColorId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      featherId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fluorescenceId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fluorescenceColorId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      fluorescenceIntensityId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      girdleId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      girdlePer: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      heartAndArrowId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      ifrsNo: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      intensityId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      keyToSymbolIds: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: true
      },
      labId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      labLocationId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      labProcessId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      locationId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'Master',
          key: 'id'
        }
      },
      lusterId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      milkyId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      nattsId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      openCrownId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      openPavId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      openTableId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      overtoneId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      shapeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      polishId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      shapeName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shadeId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      sievesId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      subAssortStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      subSievesId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      symmetryId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      tableInclusionId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      origin: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      miningCoId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      girdleThickness: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      remarks1: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      remarks2: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      remarks3: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      bombayRemarks: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tablePer: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      crownHeight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      openInclusion: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      girdleSizeMax: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      girdleSizeMin: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      transferDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      transferCarat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fmbarcode: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      frenchCuletOval: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      tracerId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      proportionId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      notePersonId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      pavillionAvg: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      pavillionDepth: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      girdleBruted: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rapNetAvailable: {
        type: Sequelize.STRING,
        allowNull: true
      },
      barcodeNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bpfIssueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      updatedBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      deletedBy: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      marketingAvailableAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      showId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      showIssueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      showNameId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      countryOfPolishingId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      mainLotNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tracerTag: {
        type: Sequelize.STRING,
        allowNull: true
      },
      provenanceStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      lastBiddingDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastBiddingDisc: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      biddingCount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes for better performance
    await queryInterface.addIndex('Stock', ['srNo'], {
      name: 'idx_stock_srno'
    });

    await queryInterface.addIndex('Stock', ['lotNo'], {
      name: 'idx_stock_lotno'
    });

    await queryInterface.addIndex('Stock', ['certificateNo'], {
      name: 'idx_stock_certificate'
    });

    await queryInterface.addIndex('Stock', ['status'], {
      name: 'idx_stock_status'
    });

    await queryInterface.addIndex('Stock', ['isDelete'], {
      name: 'idx_stock_isdelete'
    });

    await queryInterface.addIndex('Stock', ['deletedAt'], {
      name: 'idx_stock_deletedat'
    });

    await queryInterface.addIndex('Stock', ['createdBy'], {
      name: 'idx_stock_createdby'
    });

    await queryInterface.addIndex('Stock', ['accountId'], {
      name: 'idx_stock_accountid'
    });

    await queryInterface.addIndex('Stock', ['locationId'], {
      name: 'idx_stock_locationid'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stock');
  }
};
