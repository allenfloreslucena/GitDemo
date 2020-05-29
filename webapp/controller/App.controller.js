sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("gs.GitDemo.controller.App", {
			onInit: function () {
			var oModel = new JSONModel();
			this.getView().byId("packItem").setModel(oModel);
		
		},
		
		onAdd: function() {
			var comCode = this.getView().byId("inputCC").getValue();
			var plant = this.getView().byId("inputPlant").getValue();
			
			if(comCode === "" && plant === "") {
				alert("Company Code and Plant cannot be blank.");
			}
			
			var mat = this.getView().byId("inMaterial").getValue();
			var bat = this.getView().byId("inBatch").getValue();
			var qty = this.getView().byId("inQty").getValue();
			var uom = this.getView().byId("inUOM").getValue();
			
			if (mat !== "" && bat !== "" && qty !== "" && uom !== "") {
				var itemRow = {
					Material: mat,
					Batch: bat,
					Quantity: qty,
					Unit: uom
				};
				
				var oModel = this.getView().byId("packItem").getModel();
				var itemData = oModel.getProperty("/data");
				
				if (typeof itemData !== "undefined" && itemData !== null && itemData.length > 0) {
					itemData.push(itemRow);	
				} else {
					itemData = [];
					itemData.push(itemRow);
				}
				
				oModel.setData({
					data: itemData
				});
				
				this.getView().byId("inMaterial").setValue("");
				this.getView().byId("inBatch").setValue("");
				this.getView().byId("inQty").setValue("");
				this.getView().byId("inUOM").setValue("");
				
			} else {
				alert("Material/Batch/Quantity/UOM cannot be blank.");
			}
		},
		
		onDelete: function() {
			var oTable = this.getView().byId("packItem");
			var oModel2 = oTable.getModel();
			var aRows = oModel2.getData().data;
			var aContexts = oTable.getSelectedContexts();
			
			for (var i = aContexts.length - 1;i >= 0; i--) {
				var oThisObj = aContexts[i].getObject();
				
				var index = $.map(aRows, function(obj, index) {
					if (obj === oThisObj) {
						return index;
					}
				});
				
				aRows.splice(index, 1);
			}
			
			oModel2.setData({
				data: aRows
			});
			
			oTable.removeSelections(true);
		}
	});
});