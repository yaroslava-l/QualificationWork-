package com.university.goods.dto;

public class GoodsRatingDTO {
    private long id;
    private boolean liked;

    public GoodsRatingDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
