package com.university.goods.model;

public class UserGoods {
    private long id;
    private long buyerUserId;
    private long sellUserId;
    private long goodsItemId;
    private boolean requestStatus;
    private int months;

    public UserGoods() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getBuyerUserId() {
        return buyerUserId;
    }

    public void setBuyerUserId(long buyerUserId) {
        this.buyerUserId = buyerUserId;
    }

    public long getSellUserId() {
        return sellUserId;
    }

    public void setSellUserId(long sellUserId) {
        this.sellUserId = sellUserId;
    }

    public long getGoodsItemId() {
        return goodsItemId;
    }

    public void setGoodsItemId(long goodsItemId) {
        this.goodsItemId = goodsItemId;
    }

    public boolean isRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(boolean requestStatus) {
        this.requestStatus = requestStatus;
    }

    public int getMonths() {
        return months;
    }

    public void setMonths(int months) {
        this.months = months;
    }
}
