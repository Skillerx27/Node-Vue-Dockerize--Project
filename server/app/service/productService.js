const response = require("../../config/ResponseStatus");
const text = require("../../config/TextString");
/**
 * load all data
 *
 * @type {object}
 * @files productList
 *
 *
 */
const productData = require('../data/productStore').productList

class productService {
    /**
     * send all the product to the validated user
     *
     * @params null
     * @return {Promise<Object>}
     */
    productList = async (req) => {
        let output = { status: null, msg: null, token: null, data: null };

        output.data = productData
        output.status = response.STATUS_OK;
        output.msg = text.Data_Found;

        return output;
    };

    /**
    * update product price and save bidder data
    *
    * @params null
    * @return {Promise<Object>}
    */
    bidProduct = async (data) => {
        let output = { status: null, msg: null }
        let productDurationMinutes 
        try{
        let selectedProduct = productData[data.productId]
        console.log("selectedProduct", selectedProduct)

        let productDurationHour = (selectedProduct.duration / 60).toFixed(0)
        
        if(selectedProduct.duration >= 60){
            productDurationMinutes = selectedProduct.duration % 60
        }else {
            productDurationMinutes = selectedProduct.duration
        }
        
        let productTimeHour = selectedProduct.startTime.split(":")[0]
        let productTimeMinutes = selectedProduct.startTime.split(":")[1]
        let todayDate = new Date();
        let todayTime = todayDate.toLocaleTimeString([], { hour12: false });
   
        //calculating endTime
        let endTimeHour = Number(productTimeHour)+Number(productDurationHour)

        let endTimeMinutes = Number(productTimeMinutes)+Number(productDurationMinutes)
        let endTime = Number(endTimeHour)+':'+Number(endTimeMinutes)

        // validating startDate
        if(selectedProduct.startDate == data.date){
            //validating the startTime
            if(selectedProduct.startTime <= todayTime && todayTime <= endTime){

                if (!selectedProduct.userId && data.bidPrice <= selectedProduct.bidPriceLimit) {
                    productData[data.productId].price += data.bidPrice
                    productData[data.productId].userId = data.userId
                    productData[data.productId].userName = data.userName
                    output.status = response.STATUS_OK
                    output.msg = text.Bid_Success
                }
                else if (selectedProduct.userId != data.userId && data.bidPrice <= selectedProduct.bidPriceLimit) {
                    productData[data.productId].price += data.bidPrice
                    productData[data.productId].userId = data.userId
                    productData[data.productId].userName = data.userName
                    output.status = response.STATUS_OK
                    output.msg = text.Bid_Success
                }
                else {
                    output.status = response.STATUS_FORBIDDEN
                    if(data.bidPrice > selectedProduct.bidPriceLimit){
                        output.msg = text.Exciding_Bid_Amount
                    }else{
                        output.msg = text.Already_Bided
                    }
                    
                }
            }else{
                output.status = response.STATUS_FORBIDDEN
                output.msg = text.Bid_Time_Over
                
                
                
            }
        }else if(selectedProduct.startDate < data.date){
            output.status = response.STATUS_FORBIDDEN
            output.msg = text.Bid_Time_Over
        }
        else{
            output.status = response.STATUS_FORBIDDEN
            output.msg = text.Bid_Start_Failed
        }
        }catch(er){
            output.status = response.STATUS_FORBIDDEN
            output.msg = text.Bid_Start_Failed
        }

        return output;
    };

    setBidLimit = async (req,res) => {
        let output = { status: null, msg: null }
        try{
            productData[req.body.id].bidPriceLimit = req.body.priceLimit
            output.msg = text.Bid_Price_Limit_Updated
            output.status = text.STATUS_OK

        }catch{
            output.msg = text.Update_Failed
            output.status = text.STATUS_FORBIDDEN
        }
        
        return output
    }

}

module.exports = productService;
