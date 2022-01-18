<template>
  <div>
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-3">
            <div
              class="_1adminOverveiw_card _box_shadow _border_radious _mar_b30 _1adminOverveiw_bg_one"
            >
              <div class="_1adminOverveiw_card_left">
                <p class="_1adminOverveiw_card_left_num">3</p>

                <p class="_1adminOverveiw_card_left_title">Today's News</p>
              </div>
              <div class="_1adminOverveiw_card_right">
                <Icon type="ios-paper" />
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div
              class="_1adminOverveiw_card _box_shadow _border_radious _mar_b30 _1adminOverveiw_bg_two"
            >
              <div class="_1adminOverveiw_card_left">
                <p class="_1adminOverveiw_card_left_num">29</p>

                <p class="_1adminOverveiw_card_left_title">Total News</p>
              </div>
              <div class="_1adminOverveiw_card_right">
                <Icon type="ios-paper-outline" />
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div
              class="_1adminOverveiw_card _box_shadow _border_radious _mar_b30 _1adminOverveiw_bg_two"
            >
              <div class="_1adminOverveiw_card_left">
                <p class="_1adminOverveiw_card_left_num">29</p>

                <p class="_1adminOverveiw_card_left_title">Features News</p>
              </div>
              <div class="_1adminOverveiw_card_right">
                <Icon type="md-copy" />
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div
              class="_1adminOverveiw_card _box_shadow _border_radious _mar_b30 _1adminOverveiw_bg_two"
            >
              <div class="_1adminOverveiw_card_left">
                <p class="_1adminOverveiw_card_left_num">29</p>

                <p class="_1adminOverveiw_card_left_title">Card News</p>
              </div>
              <div class="_1adminOverveiw_card_right">
                <Icon type="md-list-box" />
              </div>
            </div>
          </div>
        </div>
        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
        <div
          class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
        >
          <p class="_title0">
            Tags <Button @click="addModel = true"><Icon type="md-add" /> Add Tag</Button>
          </p>

          <div class="_overflow _table_div">
            <table class="_table">
              <!-- TABLE TITLE -->
              <tr>
                <th>Id</th>
                <th>Tag Name</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
              <!-- TABLE TITLE -->

              <!-- ITEMS -->
              <tr v-for="(tag, i) in tags" :key="i" v-if="tags.length">
                <td>{{ tag.id }}</td>
                <td class="_table_name">
                  {{ tag.tagName }}
                </td>
                <td>{{ tag.created_at }}</td>
                <td>
                  <button
                    class="_btn _action_btn edit_btn1"
                    type="button"
                    @click="showEditModal(tag, i)"
                  >
                    Edit
                  </button>
                  <button
                    class="_btn _action_btn make_btn1"
                    type="button"
                    @click="showDeleteModal(tag, i)"
                    :loading="tag.isDeleting"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <!-- ITEMS -->
            </table>
          </div>
        </div>
        <Page :total="100" />

        <!-- tag Model Create -->

        <Modal
          v-model="addModel"
          title="Add Tag "
          :mask-closable="true"
          :closable="false"
        >
          <Input v-model="data.tagName" placeholder="Add Tag Name" />
          <div slot="footer">
            <Button type="default" v-on:click="addModel = false">Close</Button>
            <Button
              type="primery"
              v-on:click="addTag"
              :disabled="isAdding"
              :loading="isAdding"
            >
              {{ isAdding ? "Adding...." : "Add Tag" }}
            </Button>
          </div>
        </Modal>
        <!-- tag Model Edit -->
        <Modal
          v-model="editModel"
          title="Edit Tag "
          :mask-closable="true"
          :closable="true"
        >
          <Input v-model="editData.tagName" placeholder="Edit Tag Name" />
          <div slot="footer">
            <Button type="default" v-on:click="editModel = false">Close</Button>
            <Button
              type="primery"
              :disabled="isAdding"
              :loading="isAdding"
              v-on:click="editTag"
            >
              {{ isAdding ? "Editing...." : "Edit Tag" }}
            </Button>
          </div>
        </Modal>
        <!-- tag Model delete -->

        <Modal v-model="showDelete" width="360">
          <p slot="header" style="color: #f60; text-align: center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
          </p>
          <div style="text-align: center">
            <p>
              Are you sure you want to delete this tag
            </p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="deleteTag"
              >Delete</Button
            >
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        tagName: "",
      },
      addModel: false,
      editModel: false,
      showDelete : false,
      isAdding: false,
      editData: {
        tagName: "",
      },

      i : -1,
      deleteItem : {},
      index: -1,
      tags: [],
    };
  },
  methods: {
    async addTag() {
      //   if (this.data.tagName.trim() == "") return this.info("Tag name is wrong");
      const res = await this.callApi("post", "api/createtag", this.data);

      if (res.status === 201) {
        this.tags.unshift(res.data);
        this.success("Tag has been add successfully");
        this.addModel = false;
        this.data.tagName = "";
      } else {
        if (res.status === 422) {
          if (res.data.errors.tagName) {
            this.error(res.data.errors.tagName[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    async editTag() {
      if (this.editData.tagName.trim() == "") return this.info("Tag name is wrong");
      const res = await this.callApi("post", "api/edittag", this.editData);

      if (res.status === 200) {
        this.tags[this.index].tagName = this.editData.tagName;
        this.success("Tag has been edit  Successfully");
        this.editModel = false;
      } else {
        this.swr();
      }
    },
    showEditModal(tag, index) {
      let obj = {
        id: tag.id,
        tagName: tag.tagName,
      };
      this.editData = obj;
      this.editModel = true;
      this.index = index;
    },

    showDeleteModal(tag, i) {
          this.deleteItem = tag,
          this.i = i,
          this.showDelete = true
    },
    async deleteTag() {
      const res = await this.callApi("post", "api/delete_tag", this.deleteItem);
      if (res.status === 200) {
        this.showDelete = false
        this.tags.splice(this.i, 1);
        this.success("this tag had been deleted");
      } else {
        this.swr();
      }
    },


  },
  async created() {
    const res = await this.callApi("get", "api/gettag");
    if (res.status === 200) {
      this.tags = res.data;
    } else {
      this.swr();
    }
  },
};
</script>
