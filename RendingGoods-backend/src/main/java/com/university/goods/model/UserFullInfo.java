package com.university.goods.model;

public class UserFullInfo {
    private long id;
    private String name;
    private String email;
    private String male;
    private String surname;
    private String img;
    private Integer phone;
    private Integer yearsOld;
    private boolean blocked;

    public UserFullInfo() {
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMale() {
        return male;
    }

    public void setMale(String male) {
        this.male = male;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public Integer getYearsOld() {
        return yearsOld;
    }

    public void setYearsOld(Integer yearsOld) {
        this.yearsOld = yearsOld;
    }
}
